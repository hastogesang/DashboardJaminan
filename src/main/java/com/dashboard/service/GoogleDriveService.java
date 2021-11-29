package com.dashboard.service;

import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.auth.oauth2.TokenResponse;
import com.google.api.client.auth.oauth2.TokenResponseException;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.auth.oauth2.GoogleRefreshTokenRequest;
import com.google.api.client.http.FileContent;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.DriveScopes;
import com.google.api.services.drive.model.File;
import com.google.api.services.drive.model.Permission;

@Service
@Transactional
public class GoogleDriveService {
    private static HttpTransport HTTP_TRANSPORT = new NetHttpTransport();
	private static JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();

	private static final List<String> SCOPES = Arrays.asList(DriveScopes.DRIVE,
			"https://www.googleapis.com/auth/drive.install");

	private static final String USER_IDENTIFIER_KEY = "DUMMY_USER";

	// @Value("${google.oauth.callback.uri}")
	// private String CALLBACK_URI;

	@Value("${google.secret.key.path}")
	private Resource gdSecretKeys;

	@Value("${google.credentials.folder.path}")
	private Resource credentialsFolder;

	private GoogleAuthorizationCodeFlow flow;

	private String refreshToken = "1//04gPm5WpSWprUCgYIARAAGAQSNwF-L9IrxIbIJnKz1ZE_NKltfyohOBnE69sc9MTXPYTKdhQn6YE0Wjo7EAdC3eklvYBOj8HvKI0";
	private String clientId = "258334713510-ir03sbtdto2gqq3u1t6qveerhor0hpih.apps.googleusercontent.com";
	private String clientSecret = "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";

	@PostConstruct
	public void init() throws Exception {
		GoogleClientSecrets secrets = GoogleClientSecrets.load(JSON_FACTORY,
				new InputStreamReader(gdSecretKeys.getInputStream()));
		flow = new GoogleAuthorizationCodeFlow.Builder(HTTP_TRANSPORT, JSON_FACTORY, secrets, SCOPES)
				.setDataStoreFactory(new FileDataStoreFactory(credentialsFolder.getFile())).build();
	}

    public void createAndStoreCredential() throws IOException{
        try {
			TokenResponse response =
			new GoogleRefreshTokenRequest(new NetHttpTransport(), new GsonFactory(),
			refreshToken, clientId, clientSecret).execute();
			// System.out.println("Access token: " + response.getAccessToken());
			flow.createAndStoreCredential(response, USER_IDENTIFIER_KEY);
		} catch (TokenResponseException e) {

			// System.err.println(e.getMessage());
		}
    }

    public String uploadFileInFolder(String path) throws Exception {
		Credential cred = flow.loadCredential(USER_IDENTIFIER_KEY);

		Drive drive = new Drive.Builder(HTTP_TRANSPORT, JSON_FACTORY, cred)
				.setApplicationName("Dashboard").build();

		File file = new File();
		file.setName("dana.pdf");
		file.setParents(Arrays.asList("1HiaV3sgfj3U_x0-PmfDpIGPpkJ2qasYF")); //folderId

		FileContent content = new FileContent("application/pdf", new java.io.File(path));
		File uploadedFile = drive.files().create(file, content).setFields("id").execute();

        return uploadedFile.getId();
	}

    public String getShareableLink(String fileId) throws Exception {
		Credential cred = flow.loadCredential(USER_IDENTIFIER_KEY);

		Drive drive = new Drive.Builder(HTTP_TRANSPORT, JSON_FACTORY, cred)
				.setApplicationName("Dashboard").build();

        Permission permission = new Permission();
        permission.setType("anyone");
        permission.setRole("reader");

        drive.permissions().create(fileId, permission).execute();

        String fileReference = String.format("https://drive.google.com/file/d/%s/view?usp=sharing", fileId);
        return fileReference;
	}
}
