import "dotenv/config";
import mongoose from "mongoose";
import {
  Lead,
  Property,
  Agent,
  Activity,
  Message,
  MessageTemplate,
} from "../models/mongoose-models";

const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/hobbyconnect";
const TEST_USER_ID = "69382587450104d430f06e8a"; // Test user ID from seeding

async function addUserIdFields() {
  try {
    await mongoose.connect(MONGODB_URL, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("Connected to MongoDB");

    // For Leads
    const leadsWithoutUserId = await Lead.find({ userId: { $exists: false } });
    if (leadsWithoutUserId.length > 0) {
      console.log(
        `Found ${leadsWithoutUserId.length} leads without userId, adding test user ID...`
      );
      await Lead.updateMany(
        { userId: { $exists: false } },
        { $set: { userId: TEST_USER_ID } }
      );
      console.log("Leads updated");
    }

    // For Properties
    const propertiesWithoutUserId = await Property.find({
      userId: { $exists: false },
    });
    if (propertiesWithoutUserId.length > 0) {
      console.log(
        `Found ${propertiesWithoutUserId.length} properties without userId, adding test user ID...`
      );
      await Property.updateMany(
        { userId: { $exists: false } },
        { $set: { userId: TEST_USER_ID } }
      );
      console.log("Properties updated");
    }

    // For Agents
    const agentsWithoutUserId = await Agent.find({
      userId: { $exists: false },
    });
    if (agentsWithoutUserId.length > 0) {
      console.log(
        `Found ${agentsWithoutUserId.length} agents without userId, assigning to individual users...`
      );
      // Assign each agent to a different user ID
      const agents = await Agent.find().lean();
      for (let i = 0; i < agents.length; i++) {
        const userIds = [
          "69382587450104d430f06e81", // User 1
          "69382587450104d430f06e83", // User 2
          "69382587450104d430f06e85", // User 3
          "69382587450104d430f06e87", // User 4
        ];
        const userId = userIds[i % userIds.length];
        await Agent.updateOne({ _id: agents[i]._id }, { $set: { userId } });
      }
      console.log("Agents updated");
    }

    // For Activities
    const activitiesWithoutUserId = await Activity.find({
      userId: { $exists: false },
    });
    if (activitiesWithoutUserId.length > 0) {
      console.log(
        `Found ${activitiesWithoutUserId.length} activities without userId, adding test user ID...`
      );
      await Activity.updateMany(
        { userId: { $exists: false } },
        { $set: { userId: TEST_USER_ID } }
      );
      console.log("Activities updated");
    }

    // For Messages
    const messagesWithoutUserId = await Message.find({
      userId: { $exists: false },
    });
    if (messagesWithoutUserId.length > 0) {
      console.log(
        `Found ${messagesWithoutUserId.length} messages without userId, adding test user ID...`
      );
      await Message.updateMany(
        { userId: { $exists: false } },
        { $set: { userId: TEST_USER_ID } }
      );
      console.log("Messages updated");
    }

    // For MessageTemplates
    const templatesWithoutUserId = await MessageTemplate.find({
      userId: { $exists: false },
    });
    if (templatesWithoutUserId.length > 0) {
      console.log(
        `Found ${templatesWithoutUserId.length} message templates without userId, adding test user ID...`
      );
      await MessageTemplate.updateMany(
        { userId: { $exists: false } },
        { $set: { userId: TEST_USER_ID } }
      );
      console.log("Message templates updated");
    }

    console.log("Migration completed successfully!");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

addUserIdFields();
