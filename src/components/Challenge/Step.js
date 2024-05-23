const stepsData = {
    steps: [
        {
            step: 1,
            description: "Initialize the project",
            status: true,
            days: [
            { day: 1, description: "Set up project repository", status: true },
            { day: 2, description: "Define project goals", status: true },
            { day: 3, description: "Gather initial requirements", status: true },
            { day: 4, description: "Create project plan", status: true },
            { day: 5, description: "Set up version control", status: true }
            ]
        },
        {
            "step": 2,
            "description": "Set up the development environment",
            "status": false,
            "days": [
                { "day": 6, "description": "Install necessary software", "status": false },
                { "day": 7, "description": "Configure development tools", "status": false },
                { "day": 8, "description": "Set up local server", "status": false },
                { "day": 9, "description": "Verify environment setup", "status": false },
                { "day": 10, "description": "Document setup process", "status": false }
            ]
        },
        {
            "step": 3,
            "description": "Implement the main features",
            "status": false,
            "days": [
                { "day": 11, "description": "Design main feature A", "status": false },
                { "day": 12, "description": "Develop main feature A", "status": false },
                { "day": 13, "description": "Test main feature A", "status": false },
                { "day": 14, "description": "Design main feature B", "status": false },
                { "day": 15, "description": "Develop main feature B", "status": false }
            ]
        },
        {
            "step": 4,
            "description": "Test the application",
            "status": false,
            "days": [
                { "day": 16, "description": "Write test cases", "status": false },
                { "day": 17, "description": "Perform unit testing", "status": false },
                { "day": 18, "description": "Perform integration testing", "status": false },
                { "day": 19, "description": "Conduct user acceptance testing", "status": false },
                { "day": 20, "description": "Review and document test results", "status": false }
            ]
        },
        {
            "step": 5,
            "description": "Deploy to production",
            "status": false,
            "days": [
                { "day": 21, "description": "Prepare deployment plan", "status": false },
                { "day": 22, "description": "Set up production environment", "status": false },
                { "day": 23, "description": "Deploy application", "status": false },
                { "day": 24, "description": "Perform post-deployment checks", "status": false },
                { "day": 25, "description": "Monitor application performance", "status": false }
            ]
        }
        // 나머지 스텝들도 동일하게 추가
        ]
    };

export default stepsData;

