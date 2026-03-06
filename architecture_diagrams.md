# System Architecture Diagrams

## Figure 1: High-Level System Architecture
```mermaid
graph TD
    User[Farmer / User] -->|HTTPS| Frontend[React Frontend\n(Netlify/Vercel)]
    Frontend -->|REST API| API_Gateway[API Gateway / Load Balancer]
    API_Gateway -->|Requests| Backend[Flask Backend Server]
    
    subgraph "Application Layer"
        Backend -->|Auth| Auth_Module[Authentication Service]
        Backend -->|Business Logic| Trade_Engine[Smart Trade Engine]
        Backend -->|Orchestration| AI_Handler[AI Request Handler]
    end
    
    subgraph "Data Layer"
        Backend -->|Read/Write| DB[(MongoDB / In-Memory Store)]
        DB -->|Persist| User_Data[User Profiles]
        DB -->|Persist| Health_Logs[Health Records]
    end
    
    subgraph "Intelligence Layer (External)"
        AI_Handler -->|API Call| Gemini[Google Gemini 1.5 Flash]
        Gemini -->|Response| AI_Handler
    end
```

## Figure 2: Multimodal Disease Detection Pipeline
```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Gemini as Gemini 1.5 Flash
    
    User->>Frontend: Upload Image + Enter Vitals (Temp, Intake)
    Frontend->>Backend: POST /api/scan (Image + Metadata)
    Backend->>Backend: Preprocess Image (Base64)
    Backend->>Backend: Construct "Chain-of-Thought" Prompt
    note over Backend: Prompt includes clinical rules\n(e.g., "Check temp > 102F")
    Backend->>Gemini: Generate Content (Prompt + Image)
    Gemini-->>Backend: JSON Response (Diagnosis, Confidence, Advice)
    Backend->>Backend: Parse JSON & Check Safety Filters
    Backend-->>Frontend: Display Diagnosis & Treatment Plan
```

## Figure 3: Smart Trade Valuation Logic
```mermaid
flowchart LR
    Input[Input Parameters] -->|Breed, Weight, Age| Base_Calc[Base Price Calculation]
    Input -->|Lactation Cycle| Milk_Bonus[Milk Yield Bonus]
    Input -->|Vaccination Status| Health_Score[Health Score Adjustment]
    
    Base_Calc --> Valuation[Valuation Engine]
    Milk_Bonus --> Valuation
    Health_Score --> Valuation
    
    Valuation -->|Apply Regional Factors| Zone_Adj[Zone-based Adjustment]
    Zone_Adj --> Final_Price[Final Estimated Price]
    
    subgraph "AI Justification"
        Valuation -.->|Context| Generator[Natural Language Generator]
        Generator -.->|Explanation| Output[Price + Reasoning]
    end
```
