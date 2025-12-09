#!/usr/bin/env node

// Simple test script to verify user isolation
const API_BASE = "http://localhost:5000/api";

// Test credentials
const testUser = {
  email: "text@example.com",
  password: "123456",
};

async function makeRequest(method, endpoint, token, body) {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE}${endpoint}`, options);
  const data = await response.json();

  return { status: response.status, data };
}

async function runTests() {
  console.log("🧪 Testing User Data Isolation...\n");

  try {
    // Step 1: Login
    console.log("1️⃣ Logging in...");
    const loginRes = await makeRequest("POST", "/auth/login", undefined, {
      email: testUser.email,
      password: testUser.password,
    });

    if (loginRes.status !== 200) {
      console.error("❌ Login failed:", loginRes.data);
      return;
    }

    const token = loginRes.data.token;
    const userId = loginRes.data.user.id;
    console.log(`✅ Login successful! User ID: ${userId}\n`);

    // Step 2: Get leads with user isolation
    console.log("2️⃣ Fetching leads with authorization...");
    const leadsRes = await makeRequest("GET", "/leads", token);

    if (leadsRes.status !== 200) {
      console.error("❌ Failed to fetch leads:", leadsRes.data);
      return;
    }

    console.log(`✅ Fetched ${leadsRes.data.length} leads\n`);

    // Step 3: Verify all leads belong to this user
    console.log("3️⃣ Verifying all leads belong to the authenticated user...");
    const allBelongToUser = leadsRes.data.every(lead => lead.userId === userId);

    if (allBelongToUser) {
      console.log(
        `✅ All ${leadsRes.data.length} leads belong to user ${userId}\n`
      );
    } else {
      console.log(
        `❌ Some leads don't belong to the user! Found leads with different userIds\n`
      );
      const invalidLeads = leadsRes.data.filter(lead => lead.userId !== userId);
      console.log("Invalid leads:", invalidLeads);
      return;
    }

    // Step 4: Get properties with user isolation
    console.log("4️⃣ Fetching properties with authorization...");
    const propsRes = await makeRequest("GET", "/properties", token);

    if (propsRes.status !== 200) {
      console.error("❌ Failed to fetch properties:", propsRes.data);
      return;
    }

    console.log(`✅ Fetched ${propsRes.data.length} properties\n`);

    // Step 5: Verify all properties belong to this user
    console.log("5️⃣ Verifying all properties belong to the authenticated user...");
    const propsValid = propsRes.data.every(prop => prop.userId === userId);

    if (propsValid) {
      console.log(
        `✅ All ${propsRes.data.length} properties belong to user ${userId}\n`
      );
    } else {
      console.log(
        `❌ Some properties don't belong to the user! Found properties with different userIds\n`
      );
      return;
    }

    // Step 6: Get dashboard stats
    console.log("6️⃣ Fetching dashboard stats with user isolation...");
    const statsRes = await makeRequest("GET", "/dashboard/stats", token);

    if (statsRes.status !== 200) {
      console.error("❌ Failed to fetch stats:", statsRes.data);
      return;
    }

    console.log("✅ Dashboard stats fetched successfully!");
    console.log("Stats:", JSON.stringify(statsRes.data, null, 2));

    // Step 7: Test permission denied scenario
    console.log("\n7️⃣ Testing permission denied for unauthorized access...");
    if (leadsRes.data.length > 0) {
      const leadId = leadsRes.data[0].id;

      // Try to create a lead with a different userId in the body
      const unauthorizedRes = await makeRequest("POST", "/leads", token, {
        firstName: "Unauthorized",
        lastName: "User",
        email: "unauth@test.com",
        phone: "5555551234",
        userId: "different-user-id", // This should be ignored and replaced with auth userId
      });

      if (unauthorizedRes.status === 201) {
        // Check if the lead was created with the authenticated user's ID
        const createdLead = unauthorizedRes.data;
        if (createdLead.userId === userId) {
          console.log(
            `✅ Lead created with authenticated user's ID (not the provided one)\n`
          );
        } else {
          console.log(
            `❌ Lead was created with wrong userId: ${createdLead.userId}\n`
          );
        }
      } else {
        console.log("Request failed:", unauthorizedRes.data);
      }
    }

    console.log("\n✅ All user isolation tests passed!\n");
  } catch (error) {
    console.error("❌ Test error:", error);
  }
}

runTests();
