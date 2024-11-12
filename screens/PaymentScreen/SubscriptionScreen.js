import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import SubscriptionCard from './components/SubscriptionCard';
import Footer from './components/Footer';
import { SafeAreaView } from 'react-native-safe-area-context';

const SubscriptionScreen = () => {
  const plans = [
    {
      title: 'תוכנית פרימיום',
      price: '1499$',
      duration: 'לשנה',
      benefits: [
        'גישה ללא מגבלות',
        'אימונים מתקדמים',
        'תמיכה מתקדמת',
        'דוחות התקדמות',
      ],
      buttonLabel: 'למקצוענים',
      isRecommended: true,
    },
    {
      title: 'תוכנית בסיסית',
      price: '199$',
      duration: 'לחודש',
      benefits: [
        'אימונים לייב',
        'ציוד תוכניות',
        'לוח זמנים שבועי',
        'בדיקת התקדמות',
      ],
      buttonLabel: 'למתחילים',
    },
    {
      title: 'תוכנית סטנדרטית',
      price: '699$',
      duration: 'לחודש',
      benefits: [
        'ספריה מורחבת',
        'הורד מדריכים',
        'מעקב התקדמות',
        'שאלות ותשובות',
      ],
      buttonLabel: 'לעליה ברמה',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.videoThumbnailContainer}>
            <Image
              source={{ uri: 'https://via.placeholder.com/300' }} // Placeholder for the video thumbnail
              style={styles.videoThumbnail}
            />
            <View style={styles.playButtonOverlay}>
              <Text style={styles.playButton}>▶</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>!הצטרפו למהפכת הכושר שלנו</Text>
          <Text style={styles.headerDescription}>
            הרשמו לתוכנית שלנו ושפרו חווית כושר נוספת עם תוכניות מותאמות אישית ליכולות ולמוטיבציה האישית שלכם!
          </Text>
        </View>

        {/* Subscription Cards */}
        {plans.map((plan, index) => (
          <SubscriptionCard key={index} {...plan} />
        ))}
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SubscriptionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  headerContainer: {
    marginBottom: 20,
  },
  videoThumbnailContainer: {
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  videoThumbnail: {
    width: '100%',
    height: 180,
    borderRadius: 12,
  },
  playButtonOverlay: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: [{ translateX: -20 }, { translateY: -20 }],
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 10,
  },
  playButton: {
    color: '#FFF',
    fontSize: 24,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  headerDescription: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 16,
  },
});
