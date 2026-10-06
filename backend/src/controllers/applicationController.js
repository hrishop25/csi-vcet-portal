import Application from '../models/Application.js';
import { inMemoryStore } from '../utils/seeder.js';
import { getDbStatus } from '../config/db.js';

// POST /api/apply - Public recruitment submission
export const submitApplication = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      rollNumber,
      year,
      department,
      domainPreference,
      skills,
      statementOfPurpose,
      portfolioUrl,
    } = req.body;

    if (!name || !email || !year || !department) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, academic year, and department are mandatory.',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
    }

    const { connected } = getDbStatus();

    // Parse skills if string
    const parsedSkills = Array.isArray(skills)
      ? skills
      : typeof skills === 'string'
      ? skills.split(',').map((s) => s.trim()).filter(Boolean)
      : [];

    const newAppPayload = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: (phone || '').trim(),
      rollNumber: (rollNumber || '').trim(),
      year,
      department,
      domainPreference: domainPreference || 'Technical',
      skills: parsedSkills,
      statementOfPurpose: (statementOfPurpose || '').trim(),
      portfolioUrl: (portfolioUrl || '').trim(),
      status: 'Pending',
      interviewSlot: null,
      adminNotes: '',
      dateApplied: new Date().toISOString(),
    };

    let createdDoc;

    if (connected) {
      // Check for existing application with same email
      const existing = await Application.findOne({ email: newAppPayload.email });
      if (existing) {
        return res.status(409).json({
          success: false,
          message: 'An application with this email address has already been submitted for the current recruitment cycle.',
        });
      }
      createdDoc = await Application.create(newAppPayload);
    } else {
      // In-memory check
      const existing = inMemoryStore.applications.find(
        (a) => a.email.toLowerCase() === newAppPayload.email
      );
      if (existing) {
        return res.status(409).json({
          success: false,
          message: 'An application with this email address has already been submitted for the current recruitment cycle.',
        });
      }
      createdDoc = {
        _id: 'app_' + Date.now(),
        id: 'app_' + Date.now(),
        ...newAppPayload,
      };
      inMemoryStore.applications.unshift(createdDoc);
    }

    return res.status(201).json({
      success: true,
      message: 'Application submitted successfully! Welcome to CSI VCET recruitment.',
      data: createdDoc,
    });
  } catch (error) {
    console.error('[Submit Application Error]', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to submit application',
    });
  }
};

// GET /api/applications - Admin protected fetch with filtering
export const getApplications = async (req, res) => {
  try {
    const { year, department, status, search } = req.query;
    const { connected } = getDbStatus();

    let applications = [];

    if (connected) {
      const query = {};
      if (year && year !== 'All') query.year = year;
      if (department && department !== 'All') query.department = department;
      if (status && status !== 'All') query.status = status;
      if (search && search.trim()) {
        const regex = new RegExp(search.trim(), 'i');
        query.$or = [
          { name: regex },
          { email: regex },
          { rollNumber: regex },
          { domainPreference: regex },
        ];
      }
      applications = await Application.find(query).sort({ dateApplied: -1 });
    } else {
      applications = inMemoryStore.applications.filter((app) => {
        if (year && year !== 'All' && app.year !== year) return false;
        if (department && department !== 'All' && app.department !== department) return false;
        if (status && status !== 'All' && app.status !== status) return false;
        if (search && search.trim()) {
          const s = search.trim().toLowerCase();
          const match =
            (app.name && app.name.toLowerCase().includes(s)) ||
            (app.email && app.email.toLowerCase().includes(s)) ||
            (app.rollNumber && app.rollNumber.toLowerCase().includes(s)) ||
            (app.domainPreference && app.domainPreference.toLowerCase().includes(s));
          if (!match) return false;
        }
        return true;
      });
      // Sort newest first
      applications.sort((a, b) => new Date(b.dateApplied) - new Date(a.dateApplied));
    }

    return res.status(200).json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    console.error('[Get Applications Error]', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch recruitment applications',
    });
  }
};

// PATCH /api/applications/:id - Update application status / notes
export const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, interviewSlot, adminNotes } = req.body;

    const validStatuses = ['Pending', 'Interviewed', 'Accepted', 'Declined'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`,
      });
    }

    const { connected } = getDbStatus();
    let updated;

    if (connected) {
      const updateData = {};
      if (status) updateData.status = status;
      if (interviewSlot !== undefined) updateData.interviewSlot = interviewSlot;
      if (adminNotes !== undefined) updateData.adminNotes = adminNotes;

      updated = await Application.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });

      if (!updated) {
        return res.status(404).json({
          success: false,
          message: 'Application not found with id: ' + id,
        });
      }
    } else {
      const appIndex = inMemoryStore.applications.findIndex(
        (a) => a._id === id || a.id === id
      );
      if (appIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'Application not found with id: ' + id,
        });
      }
      if (status) inMemoryStore.applications[appIndex].status = status;
      if (interviewSlot !== undefined)
        inMemoryStore.applications[appIndex].interviewSlot = interviewSlot;
      if (adminNotes !== undefined)
        inMemoryStore.applications[appIndex].adminNotes = adminNotes;
      updated = inMemoryStore.applications[appIndex];
    }

    return res.status(200).json({
      success: true,
      message: `Application status updated to ${updated.status}`,
      data: updated,
    });
  } catch (error) {
    console.error('[Update Application Status Error]', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to update application',
    });
  }
};

// DELETE /api/applications/:id - Delete an application
export const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const { connected } = getDbStatus();

    if (connected) {
      const deleted = await Application.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: 'Application not found',
        });
      }
    } else {
      const initialLen = inMemoryStore.applications.length;
      inMemoryStore.applications = inMemoryStore.applications.filter(
        (a) => a._id !== id && a.id !== id
      );
      if (inMemoryStore.applications.length === initialLen) {
        return res.status(404).json({
          success: false,
          message: 'Application not found',
        });
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Application successfully deleted',
      id,
    });
  } catch (error) {
    console.error('[Delete Application Error]', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete application',
    });
  }
};

// GET /api/applications/export/csv - Export applications as CSV
export const exportApplicationsCSV = async (req, res) => {
  try {
    const { connected } = getDbStatus();
    let apps = [];

    if (connected) {
      apps = await Application.find().sort({ dateApplied: -1 });
    } else {
      apps = [...inMemoryStore.applications];
    }

    const headers = [
      'ID',
      'Name',
      'Email',
      'Phone',
      'Roll Number',
      'Year',
      'Department',
      'Domain Preference',
      'Status',
      'Interview Slot',
      'Date Applied',
    ];

    const rows = apps.map((a) => [
      `"${a._id || a.id}"`,
      `"${a.name || ''}"`,
      `"${a.email || ''}"`,
      `"${a.phone || ''}"`,
      `"${a.rollNumber || ''}"`,
      `"${a.year || ''}"`,
      `"${a.department || ''}"`,
      `"${a.domainPreference || ''}"`,
      `"${a.status || ''}"`,
      `"${a.interviewSlot || 'N/A'}"`,
      `"${new Date(a.dateApplied).toLocaleDateString()}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="CSI_VCET_Applications_${new Date().toISOString().slice(0, 10)}.csv"`
    );
    return res.status(200).send(csvContent);
  } catch (error) {
    console.error('[CSV Export Error]', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to generate CSV export',
    });
  }
};
