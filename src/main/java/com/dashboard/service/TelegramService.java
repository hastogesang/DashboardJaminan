package com.dashboard.service;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

@Service
@Transactional
public class TelegramService {
    public void sendMessage(String chat_id, String text){
        String url = "https://api.telegram.org/bot2025165373:AAEeJqrkLJxq1E3ixT-nQNGQIr6SiwREYuQ/sendMessage";
		RestTemplate restTemplate = new RestTemplate();
		HttpHeaders headers = new HttpHeaders();
		headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        Map<String, String> body = new HashMap<>();
        body.put("chat_id", chat_id);
        body.put("text", text);
		HttpEntity<Map<String, String>> entity = new HttpEntity<>(body, headers);
		restTemplate.postForEntity(url, entity, String.class);
    }
}
