package com.dashboard.scheduledtask;

import com.dashboard.service.ClearingMemberService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ScheduledTasks {
    @Autowired
    private ClearingMemberService cms;

    @Scheduled(cron = "00 00 08 * * *")
	// @Scheduled(fixedRate = 60000)
	public void reportCurrentTime() {
        cms.refreshAnggotaKliring();
	}
}
