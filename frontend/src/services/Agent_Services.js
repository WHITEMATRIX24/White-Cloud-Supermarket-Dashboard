import call from "./Call";

class AgentService {
    async addAgent(data) {
        console.log("Data in Service",data);
        try {
            // Await the API call to ensure you get the actual response data
            const response = await call({
                path: "/addAgent",
                method: "POST",
                data: data,
            });

            // Return the response data
            return response;
        } catch (error) {
            console.error("Error in addAgent:", error);
            throw error; // Propagate the error
        }
    }

    getAgents() {
        const getAllAgentDetails = call({
            path:"/getAllAgentDetails",
            method:"GET"
        })
        return {
            data: getAllAgentDetails
        };
    }
}

export default new AgentService();