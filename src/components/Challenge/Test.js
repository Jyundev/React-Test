const chellange = {
    ADsP :[
        {
            name: "ADsP",
            challenger: ["user1", "user2", "user3"],
            steps: [
                {
                    step: 1,
                    complete: ["user1", "user2", "user3"],
                    days: [
                    { day: 1, description: "Set up project repository", challenger: ["user1", "user2", "user3"], },
                    { day: 2, description: "Define project goals", challenger: ["user1", "user2", "user3"], },
                    { day: 3, description: "Gather initial requirements", challenger: ["user1", "user2", "user3"], },
                    { day: 4, description: "Create project plan", challenger: ["user1", "user2", "user3"], },
                    { day: 5, description: "Set up version control", challenger: ["user1", "user2", "user3"], }
                    ]
                },
                {
                    "step": 2,
                    complete: ["user1", "user2", "user3"],
                    "days": [
                        { "day": 6, "description": "Install necessary software", challenger: ["user1", "user2", "user3"], },
                        { "day": 7, "description": "Configure development tools", challenger: ["user1", "user2", "user3"], },
                        { "day": 8, "description": "Set up local server", challenger: ["user1", "user2", "user3"], },
                        { "day": 9, "description": "Verify environment setup", challenger: ["user1", "user2", "user3"], },
                        { "day": 10, "description": "Document setup process", challenger: ["user1", "user2", "user3"], }
                    ]
                },
                {
                    "step": 3,
                    complete: ["user1", "user2", "user3"],
                    "days": [
                        { "day": 11, "description": "Design main feature A", challenger: ["user1", "user2", "user3"], },
                        { "day": 12, "description": "Develop main feature A", challenger: ["user1", "user2", "user3"], },
                        { "day": 13, "description": "Test main feature A", challenger: ["user1", "user2", "user3"], },
                        { "day": 14, "description": "Design main feature B", challenger: ["user1", "user2", "user3"], },
                        { "day": 15, "description": "Develop main feature B", challenger: ["user1", "user2", "user3"], }
                    ]
                },
                {
                    "step": 4,
                    complete: ["user1", "user2", "user3"],
                    "days": [
                        { "day": 16, "description": "Write test cases", challenger: ["user1", "user2", "user3"], },
                        { "day": 17, "description": "Perform unit testing", challenger: ["user1", "user2", "user3"], },
                        { "day": 18, "description": "Perform integration testing", challenger: ["user1", "user2", "user3"], },
                        { "day": 19, "description": "Conduct user acceptance testing", challenger: ["user1", "user2", "user3"], },
                        { "day": 20, "description": "Review and document test results", challenger: ["user1", "user2", "user3"], }
                    ]
                },
                {
                    "step": 5,
                    complete: ["user1", "user2", "user3"],
                    "days": [
                        { "day": 21, "description": "Prepare deployment plan", challenger: ["user1", "user2", "user3"], },
                        { "day": 22, "description": "Set up production environment", challenger: ["user1", "user2", "user3"], },
                        { "day": 23, "description": "Deploy application", challenger: ["user1", "user2", "user3"], },
                        { "day": 24, "description": "Perform post-deployment checks", challenger: ["user1", "user2", "user3"], },
                        { "day": 25, "description": "Monitor application performance", challenger: ["user1", "user2", "user3"], }
                    ]
                }
                // 나머지 스텝들도 동일하게 추가
                ]
        }
    ]
    
    };

export default stepsData;
