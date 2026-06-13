# ReachIQ - AI Powered Customer Engagement CRM

An AI-powered Customer Relationship Management (CRM) platform that helps businesses manage customers, create intelligent customer segments, generate personalized marketing campaigns, and analyze customer engagement through campaign tracking.

---

## Features

* Customer management dashboard
* AI-powered customer segmentation
* AI-generated marketing campaigns
* Multi-channel campaign simulation

  * Email
  * SMS
  * WhatsApp
  * RCS
* Real-time campaign event tracking
* Campaign analytics dashboard
* Customer engagement monitoring
* Delivery, Open, Read, Click, and Failure tracking

---

## Technologies Used

### Frontend

* React.js
* React Router
* Axios
* CSS

### Backend

* Node.js
* Express.js
* REST APIs

### AI Integration

* Google Gemini API

### Deployment

* Render

---

## System Architecture

The application follows a microservice-based architecture consisting of:

### CRM Backend Service

Responsible for:

* Customer management
* Campaign creation
* Segment generation
* Event processing
* Analytics calculations
* AI integration

### Channel Service

Responsible for:

* Campaign delivery simulation
* Customer engagement event generation
* Callback event processing

### Frontend Application

Provides:

* Customer management interface
* Segment builder
* Campaign management
* Analytics dashboard

---

## Modules

### Dashboard

Provides a high-level overview of CRM activity through metrics such as:

* Total Customers
* Total Revenue
* Total Campaigns
* Conversion Rate

### Customers

Displays customer information including:

* Name
* Email
* City
* Total Spending
* Last Order Date
* Status (Active, Dormant, At Risk)

### AI Segment Builder

Allows users to describe audiences in natural language and receive AI-generated customer segment recommendations.

Predefined segments:

* High Value Customers
* Dormant Customers
* At Risk Customers

### Campaign Management

Users can:

1. Select a customer segment
2. Choose a communication channel
3. Define a campaign objective
4. Generate AI-powered content
5. Launch a campaign

Supported channels:

* Email
* SMS
* WhatsApp
* RCS

### Analytics

Tracks campaign performance using:

* Delivery Rate
* Failure Rate
* Open Rate
* Read Rate
* Click Rate

Also includes a detailed campaign event timeline.

---

## Campaign Delivery Simulation

Campaign delivery is simulated through a dedicated Channel Service.

When a campaign is launched:

1. The CRM queues the campaign.
2. The Channel Service receives it.
3. Customer interaction events are generated.
4. Events are sent back to the CRM.
5. Analytics are updated automatically.

Supported events:

* Delivered
* Failed
* Opened
* Read
* Clicked

This demonstrates how real-world CRM systems monitor customer engagement across communication channels.

---

## AI Capabilities

### AI Customer Segmentation

Generate customer segments using natural language descriptions.

Example:

> Customers who have not ordered in the last month

### AI Campaign Generation

Generate personalized marketing content based on campaign goals.

Example:

> Bring back inactive customers with a 15% discount offer

The AI creates campaign subjects and marketing messages tailored to the target audience.

---

## **Author**

Created with ❤️ by **Shubhankar Sarkar** <br>
[GitHub Profile](https://github.com/shubhankar05sarkar)
