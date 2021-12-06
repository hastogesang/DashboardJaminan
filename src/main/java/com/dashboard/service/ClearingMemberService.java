package com.dashboard.service;

import java.util.List;
import java.util.Optional;

import com.dashboard.model.keuangan.AnggotaKliring;
import com.dashboard.model.skd.ClearingMemberView;
import com.dashboard.repository.keuangan.AnggotaKliringRepo;
import com.dashboard.repository.skd.ClearingMemberViewRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClearingMemberService {
    @Autowired
    private ClearingMemberViewRepo clearingMemberViewRepo;
    @Autowired
    private AnggotaKliringRepo anggotaKliringRepo;

    public void refreshAnggotaKliring() {
        List<ClearingMemberView> cmvs = this.clearingMemberViewRepo.findCMView();
        for(int i = 0; i < cmvs.size(); i++){
            String cmCode = cmvs.get(i).getCode();
            String cmName = cmvs.get(i).getName();
            String cmType = cmvs.get(i).getType();

            Optional<AnggotaKliring> anggotaKliringData = this.anggotaKliringRepo.findAKbyCode(cmCode);

            if(anggotaKliringData.isPresent()){
                if(anggotaKliringData.get().getName() != cmName || anggotaKliringData.get().getType() != cmType)
                {
                    anggotaKliringData.get().setName(cmName);
                    anggotaKliringData.get().setType(cmType);
                    this.anggotaKliringRepo.save(anggotaKliringData.get());
                }
            } else {
                AnggotaKliring akData = new AnggotaKliring();
                akData.setCode(cmCode);
                akData.setName(cmName);
                akData.setType(cmType);

                this.anggotaKliringRepo.save(akData);
            }
        }
    }
}
