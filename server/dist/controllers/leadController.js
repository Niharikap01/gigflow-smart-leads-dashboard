"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLead = exports.updateLead = exports.getSingleLead = exports.getLeads = exports.createLead = void 0;
const Lead_1 = __importDefault(require("../models/Lead"));
const createLead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const lead = yield Lead_1.default.create(Object.assign(Object.assign({}, req.body), { assignedTo: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id }));
        res.status(201).json({
            message: "Lead created successfully",
            lead,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Server Error",
            error,
        });
    }
});
exports.createLead = createLead;
const getLeads = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search, status, sort = "createdAt", page = "1", limit = "5", } = req.query;
        const query = {};
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
        const leads = yield Lead_1.default.find(query)
            .populate("assignedTo", "name email")
            .sort({ [sort]: -1 })
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber);
        const total = yield Lead_1.default.countDocuments(query);
        res.status(200).json({
            total,
            currentPage: pageNumber,
            totalPages: Math.ceil(total / limitNumber),
            leads,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Server Error",
            error,
        });
    }
});
exports.getLeads = getLeads;
const getSingleLead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lead = yield Lead_1.default.findById(req.params.id).populate("assignedTo", "name email");
        if (!lead) {
            res.status(404).json({
                message: "Lead not found",
            });
            return;
        }
        res.status(200).json(lead);
    }
    catch (error) {
        res.status(500).json({
            message: "Server Error",
            error,
        });
    }
});
exports.getSingleLead = getSingleLead;
const updateLead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lead = yield Lead_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
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
    }
    catch (error) {
        res.status(500).json({
            message: "Server Error",
            error,
        });
    }
});
exports.updateLead = updateLead;
const deleteLead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lead = yield Lead_1.default.findByIdAndDelete(req.params.id);
        if (!lead) {
            res.status(404).json({
                message: "Lead not found",
            });
            return;
        }
        res.status(200).json({
            message: "Lead deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Server Error",
            error,
        });
    }
});
exports.deleteLead = deleteLead;
