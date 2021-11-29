package com.dashboard.service;

import java.io.File;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class SendEmail {

    @Autowired
    private JavaMailSender javaMailSender;

    public void SendMail(String tujuan, String isi, String judul, String fileToAttach) throws MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper message = new MimeMessageHelper(mimeMessage, true, "utf-8");

        message.setFrom("medid260@gmail.com");
        message.setTo(tujuan);
        try {
            message.setText(isi, true);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        message.setSubject(judul);
        FileSystemResource file = new FileSystemResource(new File(fileToAttach));
        message.addAttachment(file.getFilename(), file);

        javaMailSender.send(mimeMessage);
        System.out.println("Email terkirim...");
    }
    
}
