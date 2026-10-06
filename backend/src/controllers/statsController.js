import Application from '../models/Application.js';
import Member from '../models/Member.js';
import Event from '../models/Event.js';
import { inMemoryStore } from '../utils/seeder.js';
import { getDbStatus } from '../config/db.js';

export const getDashboardStats = async (req, res) => {
  try {
    const { connected } = getDbStatus();

    let applications = [];
    let membersCount = 0;
    let eventsCount = 0;

    if (connected) {
      applications = await Application.find();
      membersCount = await Member.countDocuments();
      eventsCount = await Event.countDocuments();
    } else {
      applications = inMemoryStore.applications;
      membersCount = inMemoryStore.members.length;
      eventsCount = inMemoryStore.events.length;
    }

    const totalApplications = applications.length;
    const pending = applications.filter((a) => a.status === 'Pending').length;
    const interviewed = applications.filter((a) => a.status === 'Interviewed').length;
    const accepted = applications.filter((a) => a.status === 'Accepted').length;
    const declined = applications.filter((a) => a.status === 'Declined').length;

    const acceptanceRate =
      totalApplications > 0
        ? Math.round((accepted / totalApplications) * 100)
        : 0;

    // Breakdown by Year
    const byYear = {
      FE: applications.filter((a) => a.year === 'FE').length,
      SE: applications.filter((a) => a.year === 'SE').length,
      TE: applications.filter((a) => a.year === 'TE').length,
      BE: applications.filter((a) => a.year === 'BE').length,
    };

    // Breakdown by Department
    const byDepartment = {
      'Computer Engineering': applications.filter(
        (a) => a.department === 'Computer Engineering'
      ).length,
      'Information Technology': applications.filter(
        (a) => a.department === 'Information Technology'
      ).length,
      'Artificial Intelligence & Data Science': applications.filter(
        (a) => a.department === 'Artificial Intelligence & Data Science'
      ).length,
      'Electronics & Telecommunication': applications.filter(
        (a) => a.department === 'Electronics & Telecommunication'
      ).length,
      'Other': applications.filter(
        (a) =>
          !['Computer Engineering', 'Information Technology', 'Artificial Intelligence & Data Science', 'Electronics & Telecommunication'].includes(a.department)
      ).length,
    };

    return res.status(200).json({
      success: true,
      stats: {
        totalApplications,
        pending,
        interviewed,
        accepted,
        declined,
        acceptanceRate,
        membersCount,
        eventsCount,
        byYear,
        byDepartment,
      },
    });
  } catch (error) {
    console.error('[Dashboard Stats Error]', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to calculate recruitment statistics',
    });
  }
};
