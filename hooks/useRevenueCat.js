import { useEffect, useState } from "react";
import { Platform } from "react-native";
import Purchases from 'react-native-purchases';

Purchases.setLogLevel(Purchases.LOG_LEVEL.VERBOSE);

const APIKeys = {
    apple: "",
    google: "goog_xGVLRIqHSTwVXpHgPvBppbnBAMB",
}

const typesOfMemberships = {
    monthly: "proMonthly",
    yearly: "proYearly",
    personalMonthly: "personalMonthly",
    personalYearly: "personalYearly",
}
export default function useRevenueCat() {
    const [currentOffering, setCurrentOffering] = useState(null);
    const [customerInfo, setCustomerInfo] = useState(null);
    let isProMember = false;
    let isPersonalMember = false;
    if (customerInfo) {
        isProMember = 
            customerInfo.activeSubscriptions.includes(typesOfMemberships.monthly) || 
            customerInfo.activeSubscriptions.includes(typesOfMemberships.yearly) || 
            customerInfo.activeSubscriptions.includes(typesOfMemberships.personalMonthly) || 
            customerInfo.activeSubscriptions.includes(typesOfMemberships.personalYearly);
        isPersonalMember = 
            customerInfo.activeSubscriptions.includes(typesOfMemberships.personalMonthly) || 
            customerInfo.activeSubscriptions.includes(typesOfMemberships.personalYearly);

    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (Platform.OS == 'android') {
                    Purchases.configure({apiKey: APIKeys.google});
                } else {
                    Purchases.configure({apiKey: APIKeys.apple});
                }
                const offerrings = await Purchases.getOfferings();
                const customerInfo = await Purchases.getCustomerInfo();
                setCurrentOffering(offerrings);
                setCustomerInfo(customerInfo);
            } catch (error) {
                console.log("NATAN123 err", error.userInfo);
            }
        }
        fetchData().catch(console.error);
    }, []);

    useEffect(() => {
        const customerInfoUpdated = async (purchaserInfo) => {
            setCustomerInfo(purchaserInfo);
        }
        Purchases.addCustomerInfoUpdateListener(customerInfoUpdated)
    }, [])

    return {currentOffering, customerInfo, isProMember, isPersonalMember};
}