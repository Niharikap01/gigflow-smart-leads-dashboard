import { Response } from "express";
import Lead from "../models/Lead";
import { AuthRequest } from "../middleware/authMiddleware";

export const createLead = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const lead = await Lead.create({
      ...req.body,
      assignedTo: req.user?.id,
    });

    res.status(201).json({
      message: "Lead created successfully",
      lead,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error,
    });
  }
};

export const getLeads = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const {
      search,
      status,
      sort = "createdAt",
      page = "1",
      limit = "5",
    } = req.query;

    const query: any = {};

    // Search
    if (search) {
      query.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          company: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    // Filter
    if (status) {
      query.status = status;
    }

    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const leads = await Lead.find(query)
      .populate("assignedTo", "name email")
      .sort({ [sort as string]: -1 })
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    const total = await Lead.countDocuments(query);

    res.status(200).json({
      total,
      currentPage: pageNumber,
      totalPages: Math.ceil(total / limitNumber),
      leads,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error,
    });
  }
};

export const getSingleLead = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const lead = await Lead.findById(req.params.id).populate(
      "assignedTo",
      "name email"
    );

    if (!lead) {
      res.status(404).json({
        message: "Lead not found",
      });

      return;
    }

    res.status(200).json(lead);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error,
    });
  }
};

export const updateLead = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!lead) {
      res.status(404).json({
        message: "Lead not found",
      });

      return;
    }

    res.status(200).json({
      message: "Lead updated successfully",
      lead,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error,
    });
  }
};

export const deleteLead = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);

    if (!lead) {
      res.status(404).json({
        message: "Lead not found",
      });

      return;
    }

    res.status(200).json({
      message: "Lead deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error,
    });
  }
};