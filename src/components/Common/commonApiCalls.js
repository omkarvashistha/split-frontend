import axios from "axios";
import { SERVER_ADDRESS, TEST_SERVER } from "../Constants/constants";

const getNameFromId = async (UId) => {
    try {
        const obj = {
            "UId" : UId
        };
        // Use await directly instead of then-catch chain.
        const response = await axios.post(`${SERVER_ADDRESS}/getNameFromId`, obj);
        // Check the response code and return the appropriate value
        if (response.data.code === 100) {
            return response.data.UName;
        } else {
            return null;  // Or any fallback value you'd prefer
        }
    } catch (error) {
        console.log(error);
        return null;  // Return null or any error indicator as needed
    }
};

export default { getNameFromId };
