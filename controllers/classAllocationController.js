import ClassAllocation from "../models/ClassAllocation.js";

// Create Allocation
export const createAllocation = async (req, res) => {
  try {
    const allocation = await ClassAllocation.create(req.body);
    res.status(201).json(allocation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 
// Get All Allocations
export const getAllocations = async (req, res) => {
  try {
    const allocations = await ClassAllocation.find().populate("staff");
    res.status(200).json(allocations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Allocation
export const deleteAllocation = async (req, res) => {
  try {
    await ClassAllocation.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Allocation deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};