import React from 'react';
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';

import logoImg from '../../assets/logo.png';

import style from './style';

export default function Details() {
    const navigation = useNavigation();
    const route = useRoute();

    const incident = route.params.incident;
    const message = `Hi ${incident.name}, I'm contacting you because I'm interested in helping you on the incident '${incident.title}' with the amount of ${Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(incident.value)}.`
    
    function navigateBack() {
        navigation.goBack();
    };

    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
    };

    function sendEmail() {
        MailComposer.composeAsync({
            subject: `Hero for: ${incident.title}`,
            recipients: [incident.email],
            body: message
        })
    };

    return (
        <View style={style.container}>
            <View style={style.header}>
                <Image source={logoImg} />
                
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#e02041" />
                </TouchableOpacity>
            </View>
            <View style={style.incident}>
                <Text style={[style.incidentProperty, { marginTop: 0}]}>NGO:</Text>
                <Text style={style.incidentValue}>{incident.name} from {incident.city}/{incident.state}</Text>
                
                <Text style={style.incidentProperty}>Incident:</Text>
                <Text style={style.incidentValue}>{incident.title}</Text>
                
                <Text style={style.incidentProperty}>Description:</Text>
                <Text style={style.incidentValue}>{incident.description}</Text>
                
                <Text style={style.incidentProperty}>Amount:</Text>
                <Text style={style.incidentValue}>
                    {Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD'}).format(incident.value)}
                </Text>
            </View>

            <View style={style.contactBox}>
                <Text style={style.heroTitle}>Save the day!</Text>
                <Text style={style.heroTitle}>Be the hero this incident needs.</Text>
                <Text style={style.heroDescription}>Get in touch:</Text>

                <View style={style.actions}>
                    <TouchableOpacity style={style.action} onPress={sendWhatsapp}>
                        <Text style={style.actionText}>WhatsApp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.action} onPress={sendEmail}>
                        <Text style={style.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}