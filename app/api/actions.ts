'use server'
import nodemailer from 'nodemailer';

interface MailOptions {
    from: string;
    to: string;
    subject: string;
    text: string;
    html?: string;
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'info.primetechteam@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD,
    }
});

export const sendMail = async (mailOptions: MailOptions) => {
    try {
        if (!process.env.GMAIL_APP_PASSWORD) {
            throw new Error('GMAIL_APP_PASSWORD environment variable is not set');
        }

        // Check if the 'from' email is different from the transporter email
        if (mailOptions.from !== 'info.primetechteam@gmail.com') {
            // Append the 'from' email to the body of the email
            mailOptions.text += `\n\nOriginal sender: ${mailOptions.from}`;
            if (mailOptions.html) {
                mailOptions.html += `<br><br>Original sender: ${mailOptions.from}`;
            }
            // Set the 'from' email to the transporter email
            mailOptions.from = 'info.primetechteam@gmail.com';
        }

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email: ', error);
    }
};


// lib/serviceActions.js


interface ServiceProps {
    id?: number;
    title: string;
    description: string;
    serviceBaseType: "personal" | "business" | "enterprise";
    servicePriceOnsite?: number;
    servicePriceRemote?: number
    isRemote?: boolean;
    imageHref: string;
}

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create a new service
export async function createService({ title, description, serviceBaseType, servicePriceOnsite, servicePriceRemote, isRemote, imageHref }: ServiceProps) {
  try {
    // Ensure that enterprise services do not have a price
    if (serviceBaseType === 'enterprise' && (servicePriceOnsite || servicePriceRemote)) {
      throw new Error('Enterprise services cannot have a price.');
    }

    // Ensure that both prices are provided for personal and business services
    if (serviceBaseType !== 'enterprise' && (servicePriceOnsite === undefined || servicePriceRemote === undefined)) {
      throw new Error('Both onsite and remote prices must be provided for personal and business services.');
    }

    if(isRemote === undefined) isRemote = false
    const service = await prisma.service.create({
      data: {
        title,
        description,
        serviceBaseType,
        servicePriceOnsite,
        servicePriceRemote,
        isRemote,
        imageHref,
      },
    });

    return service;
  } catch (error) {
    throw new Error(`Error creating service: ${error}`);
  }
}

// Edit an existing service
export async function editService(id:number, { title, description, serviceBaseType, servicePriceOnsite, servicePriceRemote, isRemote, imageHref }: ServiceProps) {
  try {
    const service = await prisma.service.update({
      where: { id },
      data: {
        title,
        description,
        serviceBaseType,
        servicePriceOnsite,
        servicePriceRemote,
        isRemote,
        imageHref
      },
    });

    return service;
  } catch (error) {
    throw new Error(`Error updating service: ${error}`);
  }
}

// Delete a service
export async function deleteService(id:number) {
  try {
    const service = await prisma.service.delete({
      where: { id },
    });

    return service;
  } catch (error) {
    throw new Error(`Error deleting service: ${error}`);
  }
}

// Fetch all services
export async function fetchAllServices() {
  try {
    const services = await prisma.service.findMany();
    return services;
  } catch (error) {
    throw new Error(`Error fetching all services: ${error}`);
  }
}

// Fetch a single service by ID
export async function fetchServiceById(id:number) {
  try {
    const service = await prisma.service.findUnique({
      where: { id },
    });

    if (!service) {
      throw new Error('Service not found');
    }

    return service;
  } catch (error) {
    throw new Error(`Error fetching service by ID: ${error}`);
  }
}

// Fetch services by ServiceBaseEnum
export async function fetchServicesByBaseType(serviceBaseType : "personal" | "business" | "enterprise" ) {
  try {
    const services = await prisma.service.findMany({
      where: { serviceBaseType },
    });

    return services;
  } catch (error) {
    throw new Error(`Error fetching services by serviceBaseType: ${error}`);
  }
}
