# 🤖 PolkaAgent - AI Agent Marketplace on Polkadot

![Polkadot](https://img.shields.io/badge/Polkadot-E6007A?style=for-the-badge&logo=polkadot&logoColor=white)
![Rust](https://img.shields.io/badge/Rust-000000?style=for-the-badge&logo=rust&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)

> **The first AI agent marketplace on Polkadot** - Rent autonomous agents that optimize your DeFi, execute trades, and manage governance across the multi-chain ecosystem.

🏆 **Built for Polkadot Hackathon 2025**

---

## 🎯 What is PolkaAgent?

PolkaAgent is a decentralized marketplace where:

- **🎨 Creators** publish AI agents (trading bots, yield optimizers, governance assistants)
- **👥 Users** rent agents by paying in DOT
- **🤖 Agents** execute tasks autonomously across multiple parachains using XCM

### Why PolkaAgent?

- ✅ **Native XCM Integration** - Agents operate across parachains seamlessly
- ✅ **Fully Decentralized** - All logic in ink! smart contracts
- ✅ **Fair Revenue Split** - Creators earn 95% of rental fees
- ✅ **Autonomous Execution** - Agents work 24/7 without manual intervention
- ✅ **Trustless** - No custody of funds, everything on-chain

---

## 🏗️ Architecture
```
┌──────────────┐
│   Frontend   │  React + Polkadot.js
└──────┬───────┘
       │
┌──────▼───────┐
│   ink!       │  Smart Contract (Agent Registry)
│  Contract    │  - register_agent()
└──────┬───────┘  - rent_agent()
       │          - execute_agent()
┌──────▼───────┐
│     XCM      │  Cross-chain Messaging
└──────┬───────┘
       │
┌──────▼────────────────────┐
│  Polkadot Parachains      │
│  Hydration | Bifrost       │
│  Acala | Moonbeam          │
└───────────────────────────┘
       │
┌──────▼───────┐
│  AI Agents   │  Python scripts
│  (Off-chain) │  - Yield Optimizer
└──────────────┘  - Trading Bot
                  - Governance Assistant
```

---

## 🚀 Quick Start

### Prerequisites

- Rust 1.75+
- cargo-contract 4.0+
- Node.js 18+
- Python 3.10+
- Polkadot.js browser extension

### 1️⃣ Clone Repository
```bash
git clone https://github.com/jellyfishtechnology/polka-agent.git
cd polka-agent
```

### 2️⃣ Build Smart Contract
```bash
cd agent_registry
cargo contract build
```

### 3️⃣ Run Frontend
```bash
cd frontend
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000)

### 4️⃣ Test AI Agent
```bash
cd ai_agents
python3 yield_optimizer.py
```

---

## 📦 Project Structure
```
polka-agent/
├── agent_registry/          # ink! Smart Contract
│   ├── Cargo.toml
│   └── lib.rs              # Agent Registry contract (199 lines)
├── ai_agents/              # AI Agents (Python)
│   ├── yield_optimizer.py  # Yield optimization agent
│   ├── requirements.txt
│   └── README.md
└── frontend/               # React Frontend
    ├── package.json
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── AgentCard.jsx
    │   │   ├── AgentList.jsx
    │   │   ├── RentModal.jsx
    │   │   └── WalletConnect.jsx
    │   ├── App.js
    │   ├── App.css
    │   └── index.js
    └── README.md
```

---

## 💻 Tech Stack

### Smart Contract
- **Language:** Rust
- **Framework:** ink! 4.0
- **Blockchain:** Polkadot (Rococo testnet)
- **Cross-chain:** XCM v5

### Frontend
- **Framework:** React 18
- **Styling:** Tailwind CSS
- **Wallet:** Polkadot.js extension
- **API:** @polkadot/api, @polkadot/api-contract

### AI Agents
- **Language:** Python 3.10+
- **Computation:** Off-chain
- **Integration:** REST API → Smart Contract

---

## 🎨 Features

### For Users
- 🔍 **Browse Agents** - Discover AI agents for various DeFi strategies
- 💰 **Rent with DOT** - Pay per day, transparent pricing
- 🔗 **Cross-chain** - Agents work across multiple parachains
- 📊 **Performance Tracking** - Monitor agent results

### For Creators
- 📝 **Publish Agents** - Register agents on-chain
- 💸 **Earn Revenue** - 95% of rental fees
- 🎯 **Set Pricing** - Flexible pricing per day
- 📈 **Analytics** - Track rentals and earnings

### Current Agents

1. **🎯 Yield Optimizer**
   - Analyzes APY across Hydration, Bifrost, Acala
   - Automatically rebalances funds
   - Risk-adjusted recommendations

2. **📈 Trading Bot** (Coming soon)
   - Technical indicator-based strategies
   - 24/7 automated trading
   - Stop-loss protection

3. **🗳️ Governance Assistant** (Coming soon)
   - Proposal analysis
   - Automated voting
   - Delegation management

---

## 🔧 Smart Contract Functions

### Core Functions
```rust
// Register new agent
pub fn register_agent(
    &mut self,
    name: String,
    description: String,
    price_per_day: Balance
) -> Result<u32>

// Rent agent
#[payable]
pub fn rent_agent(
    &mut self,
    agent_id: u32,
    duration_days: u32
) -> Result<()>

// Deactivate agent (owner only)
pub fn deactivate_agent(
    &mut self,
    agent_id: u32
) -> Result<()>

// Query functions
pub fn get_agent(&self, agent_id: u32) -> Option<Agent>
pub fn get_total_agents(&self) -> u32
```

---

## 🧪 Testing

### Smart Contract Tests
```bash
cd agent_registry
cargo test
```

### Frontend (Local)
```bash
cd frontend
npm test
```

### AI Agent Demo
```bash
cd ai_agents
python3 yield_optimizer.py
```

---

## 🌐 Deployment

### Deploy Smart Contract to Testnet
```bash
cd agent_registry
cargo contract build
cargo contract instantiate --suri //Alice
```

### Deploy Frontend
```bash
cd frontend
npm run build
# Deploy to Vercel, Netlify, or IPFS
```

---

## 🎯 Roadmap

### Phase 1: MVP (Current) ✅
- [x] ink! smart contract
- [x] Basic frontend
- [x] Yield optimizer agent
- [x] Wallet integration

### Phase 2: Enhanced Features (Q1 2026)
- [ ] Real XCM integration
- [ ] Trading bot agent
- [ ] Governance assistant
- [ ] Performance analytics
- [ ] Agent ratings & reviews

### Phase 3: Ecosystem Growth (Q2 2026)
- [ ] Agent SDK for creators
- [ ] Marketplace expansion
- [ ] Token launch ($AGENT)
- [ ] DAO governance

---

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md).

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

Built with ❤️ by [@jellyfishtechnology](https://github.com/jellyfishtechnology)

---

## 🙏 Acknowledgments

- [Polkadot](https://polkadot.network/) & [Web3 Foundation](https://web3.foundation/)
- [ink!](https://use.ink/) team at Parity Technologies
- [Polkadot.js](https://polkadot.js.org/) team
- Polkadot community

---

## 📞 Contact & Support

- **GitHub:** [jellyfishtechnology/polka-agent](https://github.com/jellyfishtechnology/polka-agent)
- **Hackathon:** [Polkadot Devpost](https://polkadot.devpost.com)
- **Issues:** [GitHub Issues](https://github.com/jellyfishtechnology/polka-agent/issues)

---

## 🏆 Hackathon Submission

**Theme:** User-centric Apps + Polkadot Tinkerers

**Judging Criteria:**
- ✅ **Technological Implementation** - ink! + Polkadot.js + Python
- ✅ **Design** - Professional UI/UX
- ✅ **Potential Impact** - Brings $60B AI agent market to Polkadot
- ✅ **Creativity** - First AI agent marketplace on Polkadot

---

**⭐ Star this repo if you find it useful!**

---

*Built for Polkadot Hackathon 2025 - Deadline: November 18, 2025*
