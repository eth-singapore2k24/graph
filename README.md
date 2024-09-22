# Project Name: AEGIS

## Overview

Our project revolutionizes advertising technology by prioritizing user privacy while delivering personalized ads. We offer two dashboards: one for advertisers and one for publishers. Advertisers submit their ads as proposals to a DAO, where members vote based on their governance token stakes. The outcome determines ad display and influences the advertiser's reputation and reach.

Publishers register their websites on our platform, which scrapes content to the backend. An LLM assigns relevant tags to site sections, and an SDK wraps the website's divs to track user behavior, emitting events with generic and personal tags. Personal tags remain client-side for privacy, while encrypted generic tags are stored on IPFS.

We use The Graph to index IPFS for efficient token retrieval mapped to users. User anonymity is preserved with World-ID, masking real identities from on-chain identities. When users visit websites, tag matching triggers personalized ads on the client side.

Our system ensures full transparency by conducting all transactions on-chain and off-chain on a zk-side app chain, providing zk proofs and proof of ad display to advertisers. This approach guarantees privacy, transparency, and effective ad targeting.

## System Architecture
![diagram-export-22-09-2024-05_22_17](https://github.com/user-attachments/assets/81f7fa24-fea8-4f89-8f95-595b431a80b8)


### I. User Experience (dApp Layer)

#### dApp Integration
- **Description:** Web3 dApps integrate your platform's lightweight SDK or library.
- **Functionality:**
  - Handles ad requests based on user context (e.g., browsing history within the dApp).
  - Displays ads to users in a non-intrusive way.
  - Provides an interface for optional user engagement (clicks, interactions).
  - Facilitates communication with your platform's backend services.

#### Client-Side Interest Group Classification and Preference Management (Mina Protocol)
- **Description:** Runs on the user's device (browser or dApp environment).
- **Functionality:**
  - **Interest Group Classification:**
    - Analyzes user activity within the dApp (with their consent).
    - Classifies users into broad interest groups based on predefined rules.
  - **On-Chain Preference Management:**
    - Allows users to connect their wallets (using pseudonyms) to manage ad preferences on the Mina blockchain.
    - Uses zk-SNARKs to let users opt-out of specific ad categories or set frequency caps without revealing their actual preferences.
- **Mina Technologies:**
  - zk-SNARKs (for private preference signaling).
  - SnarkyJS (for writing the zk-SNARK circuits).

#### zk-SNARK-Based Ad Viewability Verification (Mina Protocol)
- **Description:** Runs on the user's device in conjunction with ad display.
- **Functionality:**
  - Generates a zk-SNARK proof when an ad is displayed, proving:
    - The ad was visible within the viewport.
    - The ad was displayed for a minimum duration.
  - Submits this proof to the Mina blockchain, linked to the user's pseudonym.
- **Mina Technologies:**
  - zk-SNARKs.
  - SnarkyJS.

#### Privacy-Preserving Engagement Tracking and Reward Management (Mina Protocol)
- **Description:** Handles user engagement tracking and optional reward distribution.
- **Functionality:**
  - **Engagement Tracking:**
    - Records user clicks or interactions with ads using zk-SNARKs to preserve privacy.
    - Optionally captures more granular engagement metrics (time spent viewing, interactions) if it aligns with your privacy policy.
  - **Private Reward Distribution:**
    - Uses zk-SNARKs to enable confidential transactions, hiding reward amounts from public view.
    - Allows for private, off-chain reward accumulation, with users generating zk-SNARK proofs of their total balance for withdrawals.
- **Mina Technologies:**
  - zk-SNARKs.
  - SnarkyJS.

### II. Platform Backend and Infrastructure

#### Decentralized Ad Network (AirDAO)
- **Description:** Manages ad inventory, campaign parameters, and reward mechanisms.
- **Functionality:**
  - **Campaign Management:**
    - Advertisers submit campaign proposals through the AirDAO.
    - The DAO votes on proposals based on predefined criteria (ad quality, targeting, budget).
  - **Ad Serving:**
    - Receives ad requests from dApps, considering user interest groups, campaign parameters, and available inventory.
    - Selects and serves relevant ads to users.
  - **Reward Distribution:**
    - Distributes token rewards to users based on their verified engagement and the parameters set by advertisers.
- **AirDAO Technologies:**
  - DAO governance mechanisms (voting, tokenomics).
  - Smart contracts for campaign management and reward distribution.

#### Decentralized Reputation System (Mina Protocol)
- **Description:** Tracks advertiser reputation on-chain.
- **Functionality:**
  - Assigns reputation scores to advertisers based on ad quality, campaign performance, and community feedback.
  - Uses zk-SNARKs to prevent score manipulation and protect the privacy of feedback providers.
- **Mina Technologies:**
  - SnarkyJS.
  - zk-SNARKs.

#### Off-Chain Analytics and Reporting (Potentially Ethereum Foundation, Filecoin/IPFS/Arweave)
- **Description:** Provides advertisers with detailed campaign performance data.
- **Functionality:**
  - Collects and aggregates on-chain data (ad views, clicks, reward distributions).
  - Generates reports and visualizations to help advertisers understand campaign effectiveness.
- **Potential Technologies:**
  - Ethereum smart contracts (for data aggregation and reporting).
  - Filecoin/IPFS/Arweave (for decentralized storage of large datasets).

### III. Additional Considerations

- **Pseudonym Management:** Implement a secure and privacy-preserving way to generate, store, and manage user pseudonyms. This could involve techniques like:
  - Local pseudonym generation on the user's device.
  - Decentralized storage using IPFS or similar technologies.
- **Security:** Prioritize security at all levels of the architecture, including:
  - Secure key management for encryption and zk-SNARK proofs.
  - Smart contract audits to prevent vulnerabilities.
  - Protection against Sybil attacks and other forms of fraud.
- **Scalability:** Design the system to handle a growing number of users, advertisers, and ad campaigns. Consider using layer-2 scaling solutions or other optimization techniques.

## The Graph Integration

The Graph plays a crucial role in our technology stack by enabling efficient data fetching from both on-chain and off-chain storage. It indexes IPFS files using CIDs, allowing seamless access to decentralized data. By emitting events from the client-side, we store user preferences and behavior-based data on IPFS, while simultaneously indexing The Graph to bring off-chain data on-chain for optimal retrieval. This sophisticated data management strategy provides sponsors with unparalleled insights and precision in targeting.

## AirDAO Governance

AirDAO empowers users to govern the advertising ecosystem through on-chain governance and Soulbound Tokens (SBTs), fostering a community-driven approach. Advertisers submit ads as DAO proposals, with voting outcomes determining ad display and influencing reputation. Publishers register websites, which are scraped to assign relevant tags using LLMs, and an SDK tracks user behavior. This comprehensive integration of technologies ensures a secure, transparent, and privacy-focused advertising platform, making it highly attractive to sponsors.

---
