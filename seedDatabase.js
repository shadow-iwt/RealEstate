import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Define schemas to match the actual database
const userSchema = new mongoose.Schema({
  id: { type: String, default: () => new mongoose.Types.ObjectId().toString(), unique: true },
  username: { type: String, required: true, unique: true },
  password: String,
  fullName: String,
  email: String,
  phone: String,
  role: String,
  avatar: String,
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

const agentSchema = new mongoose.Schema({
  id: { type: String, default: () => new mongoose.Types.ObjectId().toString(), unique: true },
  userId: String,
  fullName: String,
  email: String,
  phone: String,
  avatar: String,
  specialization: String,
  licenseNumber: String,
  bio: String,
  isActive: { type: Boolean, default: true },
  totalDeals: { type: Number, default: 0 },
  totalRevenue: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const propertySchema = new mongoose.Schema({
  id: { type: String, default: () => new mongoose.Types.ObjectId().toString(), unique: true },
  title: String,
  description: String,
  address: String,
  city: String,
  state: String,
  zipCode: String,
  price: Number,
  propertyType: String,
  status: String,
  bedrooms: Number,
  bathrooms: Number,
  squareFeet: Number,
  ownerEmail: String,
  ownerPhone: String,
  images: [String],
  createdAt: { type: Date, default: Date.now },
});

const leadSchema = new mongoose.Schema({
  id: { type: String, default: () => new mongoose.Types.ObjectId().toString(), unique: true },
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  company: String,
  propertyId: String,
  status: String,
  source: String,
  budget: Number,
  notes: String,
  tags: [String],
  score: Number,
  lastContacted: Date,
  createdAt: { type: Date, default: Date.now },
});

const activitySchema = new mongoose.Schema({
  id: { type: String, default: () => new mongoose.Types.ObjectId().toString(), unique: true },
  leadId: String,
  agentId: String,
  propertyId: String,
  type: String,
  description: String,
  result: String,
  notes: String,
  createdAt: { type: Date, default: Date.now },
});

const messageSchema = new mongoose.Schema({
  id: { type: String, default: () => new mongoose.Types.ObjectId().toString(), unique: true },
  leadId: String,
  senderRole: String,
  message: String,
  status: String,
  templateUsed: String,
  createdAt: { type: Date, default: Date.now },
});

const messageTemplateSchema = new mongoose.Schema({
  id: { type: String, default: () => new mongoose.Types.ObjectId().toString(), unique: true },
  name: String,
  subject: String,
  body: String,
  category: String,
  variables: [String],
  createdAt: { type: Date, default: Date.now },
});

// Create models
const User = mongoose.model('User', userSchema);
const Agent = mongoose.model('Agent', agentSchema);
const Property = mongoose.model('Property', propertySchema);
const Lead = mongoose.model('Lead', leadSchema);
const Activity = mongoose.model('Activity', activitySchema);
const Message = mongoose.model('Message', messageSchema);
const MessageTemplate = mongoose.model('MessageTemplate', messageTemplateSchema);

// Dummy data
const users = [
  { username: 'john.smith', email: 'john.smith@company.com', password: 'hash1', fullName: 'John Smith', phone: '(555) 123-4567', role: 'agent', avatar: 'https://i.pravatar.cc/150?img=0', isActive: true, createdAt: new Date('2024-01-15') },
  { username: 'sarah.johnson', email: 'sarah.johnson@company.com', password: 'hash2', fullName: 'Sarah Johnson', phone: '(555) 234-5678', role: 'agent', avatar: 'https://i.pravatar.cc/150?img=1', isActive: true, createdAt: new Date('2024-02-10') },
  { username: 'michael.davis', email: 'michael.davis@company.com', password: 'hash3', fullName: 'Michael Davis', phone: '(555) 345-6789', role: 'admin', avatar: 'https://i.pravatar.cc/150?img=2', isActive: true, createdAt: new Date('2024-01-01') },
  { username: 'emily.wilson', email: 'emily.wilson@company.com', password: 'hash4', fullName: 'Emily Wilson', phone: '(555) 456-7890', role: 'agent', avatar: 'https://i.pravatar.cc/150?img=3', isActive: true, createdAt: new Date('2024-03-20') },
  { username: 'test', email: 'text@example.com', password: '123456', fullName: 'Test User', phone: '(555) 000-0001', role: 'agent', avatar: 'https://i.pravatar.cc/150?img=99', isActive: true, createdAt: new Date('2024-01-01') },
];

const properties = [
  { title: 'Modern Downtown Penthouse', description: 'Luxury penthouse with panoramic city views, high-end finishes, smart home automation', address: '123 Main Street, Suite 2500', city: 'New York', state: 'NY', zipCode: '10001', price: 2500000, bedrooms: 3, bathrooms: 3, squareFeet: 4500, propertyType: 'Penthouse', status: 'Active', ownerEmail: 'owner1@email.com', ownerPhone: '(555) 111-2222', images: ['https://images.unsplash.com/photo-1545457733-7b6b59c3a4d1?w=800'], createdAt: new Date('2024-01-01') },
  { title: 'Suburban Family Home', description: 'Spacious 4-bedroom family home with backyard, pool, garage', address: '456 Oak Avenue', city: 'Austin', state: 'TX', zipCode: '78701', price: 650000, bedrooms: 4, bathrooms: 2.5, squareFeet: 3200, propertyType: 'Single Family Home', status: 'Active', ownerEmail: 'owner2@email.com', ownerPhone: '(555) 222-3333', images: ['https://images.unsplash.com/photo-1570129477492-45a003537e1f?w=800'], createdAt: new Date('2024-02-15') },
  { title: 'Beachfront Villa', description: 'Stunning beachfront property with ocean access, infinity pool', address: '789 Beach Road', city: 'Miami', state: 'FL', zipCode: '33139', price: 4200000, bedrooms: 5, bathrooms: 4, squareFeet: 6800, propertyType: 'Villa', status: 'Active', ownerEmail: 'owner3@email.com', ownerPhone: '(555) 333-4444', images: ['https://images.unsplash.com/photo-1552488555-b9f87c1a1f97?w=800'], createdAt: new Date('2024-03-01') },
  { title: 'Historic Downtown Loft', description: 'Trendy loft conversion with exposed brick, high ceilings', address: '321 Warehouse Street', city: 'Portland', state: 'OR', zipCode: '97214', price: 550000, bedrooms: 2, bathrooms: 2, squareFeet: 2200, propertyType: 'Loft', status: 'Active', ownerEmail: 'owner4@email.com', ownerPhone: '(555) 444-5555', images: ['https://images.unsplash.com/photo-1531968455001-5ff61a1ff3f7?w=800'], createdAt: new Date('2024-04-10') },
  { title: 'Mountain Retreat Cabin', description: 'Serene mountain cabin with forest views, fireplace', address: '555 Pine Forest Lane', city: 'Boulder', state: 'CO', zipCode: '80301', price: 850000, bedrooms: 3, bathrooms: 2, squareFeet: 2800, propertyType: 'Cabin', status: 'Pending', ownerEmail: 'owner5@email.com', ownerPhone: '(555) 555-6666', images: ['https://images.unsplash.com/photo-1470252649378-9c29740ff023?w=800'], createdAt: new Date('2024-05-20') },
  { title: 'Luxury Waterfront Condo', description: 'Modern waterfront condo with marina view, spa amenities', address: '200 Harbor Lane', city: 'San Diego', state: 'CA', zipCode: '92101', price: 1800000, bedrooms: 3, bathrooms: 3, squareFeet: 3800, propertyType: 'Condo', status: 'Active', ownerEmail: 'owner6@email.com', ownerPhone: '(555) 666-7777', images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'], createdAt: new Date('2024-06-01') },
  { title: 'Country Estate', description: 'Large estate on 20 acres with barn, pond, guest house', address: '888 Rural Road', city: 'Nashville', state: 'TN', zipCode: '37215', price: 1200000, bedrooms: 6, bathrooms: 5, squareFeet: 5500, propertyType: 'Estate', status: 'Active', ownerEmail: 'owner7@email.com', ownerPhone: '(555) 777-8888', images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800'], createdAt: new Date('2024-07-10') },
];

const messageTemplates = [
  { name: 'Initial Contact', subject: 'Interested in Your Property', body: 'Hello {{firstName}},\n\nI came across your listing and am very interested. Would you be available for a viewing?\n\nBest,\n{{agentName}}', category: 'first_contact', variables: ['firstName', 'agentName'], createdAt: new Date('2024-01-01') },
  { name: 'Follow-up Message', subject: 'Following Up on {{propertyTitle}}', body: 'Hi {{firstName}},\n\nI wanted to check in about {{propertyTitle}}. Do you have any questions?\n\nBest,\n{{agentName}}', category: 'follow_up', variables: ['firstName', 'propertyTitle', 'agentName'], createdAt: new Date('2024-01-05') },
  { name: 'Offer Notification', subject: 'New Offer for {{propertyTitle}}', body: 'Hello {{firstName}},\n\nGreat news! We received an offer for {{propertyTitle}}.\n\nOffer Amount: ${{offerAmount}}\nClosing: {{closingDate}}\n\nBest,\n{{agentName}}', category: 'offer', variables: ['firstName', 'propertyTitle', 'offerAmount', 'closingDate', 'agentName'], createdAt: new Date('2024-01-10') },
  { name: 'Inspection Reminder', subject: 'Upcoming Inspection', body: 'Hi {{firstName}},\n\nYour property inspection is scheduled for {{inspectionDate}} at {{inspectionTime}}.\n\nPlease ensure access.\n\nThank you,\n{{agentName}}', category: 'reminder', variables: ['firstName', 'inspectionDate', 'inspectionTime', 'agentName'], createdAt: new Date('2024-01-15') },
  { name: 'Closing Notification', subject: 'Congratulations! Closing Scheduled', body: 'Hello {{firstName}},\n\nCongratulations on your purchase! Closing is scheduled for {{closingDate}} at {{closingTime}}.\n\nPlease bring ID and funds proof.\n\nSee you soon!\n{{agentName}}', category: 'closing', variables: ['firstName', 'closingDate', 'closingTime', 'agentName'], createdAt: new Date('2024-01-20') },
];

async function seedDatabase() {
  try {
    const dbUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017/hobbyconnect';
    await mongoose.connect(dbUrl);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Agent.deleteMany({});
    await Property.deleteMany({});
    await Lead.deleteMany({});
    await Activity.deleteMany({});
    await Message.deleteMany({});
    await MessageTemplate.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Insert users
    const insertedUsers = await User.insertMany(users);
    console.log(`✅ Inserted ${insertedUsers.length} users`);

    // Insert agents
    const agents = insertedUsers.slice(0, 4).map((user, index) => ({
      userId: user._id.toString(),
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      avatar: user.avatar,
      specialization: ['Commercial Real Estate', 'Residential', 'Luxury Properties', 'New Construction'][index],
      licenseNumber: `LIC${100000 + index}`,
      bio: ['Expert in commercial real estate with 12 years experience', 'Specializing in residential homes and families', 'Luxury property specialist with exclusive listings', 'New construction expert'][index],
      isActive: true,
      totalDeals: [45, 38, 52, 31][index],
      totalRevenue: [2400000, 1950000, 3100000, 1600000][index],
      createdAt: user.createdAt,
    }));
    const insertedAgents = await Agent.insertMany(agents);
    console.log(`✅ Inserted ${insertedAgents.length} agents`);

    // Insert properties
    const insertedProperties = await Property.insertMany(properties);
    console.log(`✅ Inserted ${insertedProperties.length} properties`);

    // Insert message templates
    await MessageTemplate.insertMany(messageTemplates);
    console.log(`✅ Inserted ${messageTemplates.length} message templates`);

    // Insert leads
    const leads = [
      { firstName: 'Robert', lastName: 'Thompson', email: 'robert.thompson@email.com', phone: '(555) 666-7777', company: 'Thompson Investments', propertyId: insertedProperties[0]._id.toString(), status: 'hot', source: 'website', budget: 2200000, notes: 'Very interested, wants tour this week', tags: ['premium', 'urgent', 'verified'], score: 95, lastContacted: new Date('2024-12-08'), createdAt: new Date('2024-12-01') },
      { firstName: 'Jessica', lastName: 'Martinez', email: 'jessica.martinez@email.com', phone: '(555) 777-8888', company: 'Martinez Family Trust', propertyId: insertedProperties[1]._id.toString(), status: 'warm', source: 'referral', budget: 600000, notes: 'Looking for family home, needs good schools', tags: ['family', 'schools'], score: 78, lastContacted: new Date('2024-12-07'), createdAt: new Date('2024-12-02') },
      { firstName: 'David', lastName: 'Chen', email: 'david.chen@email.com', phone: '(555) 888-9999', company: 'Chen Enterprises', propertyId: insertedProperties[2]._id.toString(), status: 'hot', source: 'cold_call', budget: 4000000, notes: 'Executive interested in vacation home', tags: ['luxury', 'vacation'], score: 88, lastContacted: new Date('2024-12-06'), createdAt: new Date('2024-12-03') },
      { firstName: 'Amanda', lastName: 'White', email: 'amanda.white@email.com', phone: '(555) 999-0000', company: 'White Creative Studio', propertyId: insertedProperties[3]._id.toString(), status: 'warm', source: 'social_media', budget: 500000, notes: 'Artist looking for loft with natural light', tags: ['artist', 'creative'], score: 72, lastContacted: new Date('2024-12-05'), createdAt: new Date('2024-12-04') },
      { firstName: 'James', lastName: 'Anderson', email: 'james.anderson@email.com', phone: '(555) 111-0000', company: 'Anderson Adventures', propertyId: insertedProperties[4]._id.toString(), status: 'warm', source: 'email', budget: 800000, notes: 'Interested in mountain cabin for retreat', tags: ['corporate', 'mountain'], score: 85, lastContacted: new Date('2024-12-04'), createdAt: new Date('2024-12-05') },
      { firstName: 'Lisa', lastName: 'Garcia', email: 'lisa.garcia@email.com', phone: '(555) 222-0000', company: 'Garcia Real Estate', propertyId: insertedProperties[5]._id.toString(), status: 'cold', source: 'website', budget: 1500000, notes: 'Browsed listing, needs follow-up', tags: ['new'], score: 45, lastContacted: new Date('2024-12-02'), createdAt: new Date('2024-12-06') },
      { firstName: 'Michael', lastName: 'Brown', email: 'michael.brown@email.com', phone: '(555) 333-0000', company: 'Brown Construction', propertyId: insertedProperties[2]._id.toString(), status: 'hot', source: 'broker', budget: 3800000, notes: 'Developer interested in waterfront property', tags: ['developer', 'commercial'], score: 92, lastContacted: new Date('2024-12-09'), createdAt: new Date('2024-12-07') },
      { firstName: 'Patricia', lastName: 'Robinson', email: 'patricia.robinson@email.com', phone: '(555) 444-0000', company: 'Robinson Wellness', propertyId: insertedProperties[1]._id.toString(), status: 'warm', source: 'referral', budget: 550000, notes: 'Looking to expand business space', tags: ['commercial'], score: 68, lastContacted: new Date('2024-12-08'), createdAt: new Date('2024-12-08') },
      { firstName: 'Christopher', lastName: 'Evans', email: 'chris.evans@email.com', phone: '(555) 555-1111', company: 'Evans Holdings', propertyId: insertedProperties[6]._id.toString(), status: 'hot', source: 'direct', budget: 1100000, notes: 'Investor interested in country estate rental income', tags: ['investor', 'income-property'], score: 90, lastContacted: new Date('2024-12-09'), createdAt: new Date('2024-12-09') },
      { firstName: 'Michelle', lastName: 'Taylor', email: 'michelle.taylor@email.com', phone: '(555) 666-2222', company: 'Taylor Design Co', propertyId: insertedProperties[0]._id.toString(), status: 'warm', source: 'referral', budget: 1800000, notes: 'Interior designer interested in penthouse renovation', tags: ['designer', 'renovation'], score: 75, lastContacted: new Date('2024-12-07'), createdAt: new Date('2024-12-08') },
    ];
    const insertedLeads = await Lead.insertMany(leads);
    console.log(`✅ Inserted ${insertedLeads.length} leads`);

    // Insert activities
    const activities = insertedLeads.map((lead, index) => ({
      leadId: lead._id.toString(),
      agentId: insertedAgents[index % insertedAgents.length]._id.toString(),
      propertyId: lead.propertyId,
      type: ['call', 'email', 'in_person_tour', 'text_message'][index % 4],
      description: ['Initial phone call', 'Sent property details', 'Property tour scheduled', 'Sent inquiry response'][index % 4],
      result: ['interested', 'awaiting_response', 'very_interested', 'engaged'][index % 4],
      notes: ['Client very interested', 'Sent comprehensive info', 'Loved the property', 'Responded positively'][index % 4],
      createdAt: new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000),
    }));
    await Activity.insertMany(activities);
    console.log(`✅ Inserted ${activities.length} activities`);

    // Insert messages
    const messages = [
      { leadId: insertedLeads[0]._id.toString(), senderRole: 'agent', message: 'Hi Robert! The penthouse viewing is scheduled for Saturday at 2pm. Would that work for you?', status: 'sent', templateUsed: 'Initial Contact', createdAt: new Date('2024-12-09 10:30') },
      { leadId: insertedLeads[0]._id.toString(), senderRole: 'lead', message: 'Saturday works perfectly! Looking forward to seeing it.', status: 'received', templateUsed: null, createdAt: new Date('2024-12-09 11:15') },
      { leadId: insertedLeads[1]._id.toString(), senderRole: 'agent', message: 'Jessica, I found the perfect family home in an excellent school district. Would you like to schedule a showing?', status: 'sent', templateUsed: 'Initial Contact', createdAt: new Date('2024-12-08 09:00') },
      { leadId: insertedLeads[2]._id.toString(), senderRole: 'agent', message: 'David, thank you for touring the beachfront villa yesterday. Are you interested in making an offer?', status: 'sent', templateUsed: 'Follow-up Message', createdAt: new Date('2024-12-08 14:00') },
      { leadId: insertedLeads[3]._id.toString(), senderRole: 'agent', message: 'Amanda, here are more photos of the loft. The natural lighting in the studio space is exceptional!', status: 'sent', templateUsed: 'Follow-up Message', createdAt: new Date('2024-12-07 13:30') },
      { leadId: insertedLeads[4]._id.toString(), senderRole: 'agent', message: 'James, we can arrange a group tour of the mountain cabin for your team. Would next month work?', status: 'sent', templateUsed: null, createdAt: new Date('2024-12-06 11:00') },
      { leadId: insertedLeads[6]._id.toString(), senderRole: 'agent', message: 'Michael, I reviewed the development potential with city contacts. Very promising zoning opportunities!', status: 'sent', templateUsed: null, createdAt: new Date('2024-12-09 15:30') },
      { leadId: insertedLeads[7]._id.toString(), senderRole: 'agent', message: 'Patricia, let me schedule a detailed walkthrough. This property will work perfectly for your expansion.', status: 'sent', templateUsed: 'Initial Contact', createdAt: new Date('2024-12-08 10:00') },
      { leadId: insertedLeads[8]._id.toString(), senderRole: 'agent', message: 'Christopher, the country estate has great rental income potential. Would you like a detailed investment analysis?', status: 'sent', templateUsed: null, createdAt: new Date('2024-12-09 09:00') },
      { leadId: insertedLeads[9]._id.toString(), senderRole: 'agent', message: 'Michelle, the penthouse is perfect for your design vision. Shall we discuss renovation possibilities?', status: 'sent', templateUsed: 'Initial Contact', createdAt: new Date('2024-12-08 16:00') },
    ];
    await Message.insertMany(messages);
    console.log(`✅ Inserted ${messages.length} messages`);

    console.log('\n🎉 Database seeding completed successfully!\n');
    console.log('📊 Summary:');
    console.log(`   • ${insertedUsers.length} users`);
    console.log(`   • ${insertedAgents.length} agents`);
    console.log(`   • ${insertedProperties.length} properties`);
    console.log(`   • ${insertedLeads.length} leads`);
    console.log(`   • ${activities.length} activities`);
    console.log(`   • ${messages.length} messages`);
    console.log(`   • ${messageTemplates.length} message templates\n`);

    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
}

seedDatabase();
