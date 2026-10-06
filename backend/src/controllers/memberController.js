import Member from '../models/Member.js';
import { inMemoryStore } from '../utils/seeder.js';
import { getDbStatus } from '../config/db.js';

export const getMembers = async (req, res) => {
  try {
    const { category } = req.query;
    const { connected } = getDbStatus();
    let members = [];

    if (connected) {
      const query = category && category !== 'All' ? { category } : {};
      members = await Member.find(query).sort({ priorityOrder: 1, createdAt: 1 });
    } else {
      members = inMemoryStore.members.filter((m) => {
        if (category && category !== 'All' && m.category !== category) return false;
        return true;
      });
      members.sort((a, b) => (a.priorityOrder || 10) - (b.priorityOrder || 10));
    }

    return res.status(200).json({
      success: true,
      count: members.length,
      data: members,
    });
  } catch (error) {
    console.error('[Get Members Error]', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch chapter members',
    });
  }
};

export const createMember = async (req, res) => {
  try {
    const { name, role, category, department, year, email, linkedin, github, imageUrl, bio } = req.body;
    if (!name || !role) {
      return res.status(400).json({ success: false, message: 'Name and role are required' });
    }

    const { connected } = getDbStatus();
    const newMemberPayload = {
      name,
      role,
      category: category || 'Core Council',
      department: department || 'Computer Engineering',
      year: year || 'TE',
      email: email || '',
      linkedin: linkedin || '',
      github: github || '',
      imageUrl: imageUrl || '',
      bio: bio || '',
      priorityOrder: 10,
    };

    let member;
    if (connected) {
      member = await Member.create(newMemberPayload);
    } else {
      member = {
        _id: 'mem_' + Date.now(),
        id: 'mem_' + Date.now(),
        ...newMemberPayload,
      };
      inMemoryStore.members.push(member);
    }

    return res.status(201).json({
      success: true,
      message: 'Member added successfully',
      data: member,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to create member',
    });
  }
};
