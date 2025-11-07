# 🤖 PolkaAgent - AI Agents

AI agents that optimize DeFi strategies across Polkadot parachains.

## 📦 Available Agents

### 1. Yield Optimizer
**File:** `yield_optimizer.py`  
**Purpose:** Analyzes APY across parachains and optimizes fund allocation

**Features:**
- ✅ Multi-parachain APY analysis
- ✅ Risk-adjusted recommendations
- ✅ Automated execution (demo mode)
- ✅ Real-time monitoring simulation

## 🚀 Quick Start

### Run Yield Optimizer:
```bash
cd ai_agents
python3 yield_optimizer.py
```

**Expected Output:**
```
🤖 Yield Optimizer v1.0.0 - Agent #1
🔍 Analyzing yields across Polkadot ecosystem...

📊 CURRENT APY ACROSS PARACHAINS:
  Bifrost      | APY:  15.2% | TVL:   32M DOT | Risk: Medium
  Astar        | APY:  14.1% | TVL:   22M DOT | Risk: Medium
  ...

✅ RECOMMENDATION: Move funds to Bifrost
⚡ EXECUTING CROSS-CHAIN TRANSFER...
🎉 OPTIMIZATION COMPLETE!
```

## 🏗️ Architecture
```
User → PolkaAgent UI → Smart Contract → AI Agent → XCM → Parachains
                            ↓
                    Agent Registry (on-chain)
```

## 🔮 Future Features

- [ ] Real parachain API integration
- [ ] Live XCM execution via smart contract
- [ ] Multiple agent types (Trading, Governance, etc.)
- [ ] Historical performance tracking
- [ ] Risk scoring algorithm
- [ ] Automated rebalancing

## 📊 Agent Types (Roadmap)

1. **Yield Optimizer** ✅ (Current)
2. **Trading Bot** (Coming soon)
3. **Governance Assistant** (Coming soon)
4. **Liquidity Manager** (Coming soon)

## 🧪 Testing
```bash
# Run with custom amount
python3 yield_optimizer.py
# Modify amount in main() function

# Run tests (future)
pytest test_agents.py
```

## 🔗 Integration with Smart Contract

In production, agents integrate with the ink! smart contract:
```python
# Pseudocode - Future implementation
from polkadot_api import PolkadotAPI

api = PolkadotAPI()
agent = YieldOptimizerAgent()

# Get recommendation
result = agent.analyze_yields()

# Execute via smart contract
api.call_contract(
    contract_address="5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
    function="execute_agent_task",
    params={
        "agent_id": 1,
        "task_type": "optimize_yield",
        "data": result
    }
)
```

## 📝 Technical Notes

- **Current version:** Uses mock data for demo purposes
- **Production version:** Will query real parachain APIs
- **XCM integration:** Coming in v2.0
- **Dependencies:** Pure Python (no external libs for demo)

## 🎯 Demo Flow

1. Agent analyzes APY across 5 parachains
2. Identifies best opportunity (highest APY)
3. Simulates XCM cross-chain transfer
4. Returns optimization result

## 💡 For Judges

This demonstrates:
- ✅ AI agent autonomous decision-making
- ✅ Multi-chain analysis capability
- ✅ Integration potential with ink! contract
- ✅ Scalable architecture for more agent types

---

**Built with ❤️ for Polkadot Hackathon 2025**
```

5. Commit message: `Add AI agents documentation`
6. Click **"Commit new file"**

---

## 🎉 STEP 6: VERIFICA

Vai alla home del repo: https://github.com/jellyfishtechnology/polka-agent

Dovresti vedere:
```
polka-agent/
├── agent_registry/
│   └── lib.rs ✅
└── ai_agents/ ✅ NUOVO!
    ├── yield_optimizer.py ✅
    ├── requirements.txt ✅
    └── README.md ✅
