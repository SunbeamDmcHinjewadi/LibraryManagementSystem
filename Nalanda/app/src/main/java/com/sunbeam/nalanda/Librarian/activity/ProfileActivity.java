package com.sunbeam.nalanda.Librarian.activity;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.sunbeam.nalanda.Librarian.adapter.BookListAdapter;
import com.sunbeam.nalanda.Librarian.entity.Books;
import com.sunbeam.nalanda.Librarian.entity.User;
import com.sunbeam.nalanda.Librarian.utils.RetrofitClient;
import com.sunbeam.nalanda.R;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ProfileActivity extends AppCompatActivity {

    TextView textName, textEmail, textContact;
    List<User> userList;
    BookListAdapter bookListAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profile);
        textName = findViewById(R.id.textName);
        textEmail = findViewById(R.id.textEmail);
        textContact = findViewById(R.id.textContact);
        getUserById();

    }


    private void getUserById() {
        // Retrieve user ID from SharedPreferences
        int uid = getSharedPreferences("libraryM",MODE_PRIVATE).getInt("uID",0);

        // Make API call to retrieve user details
        RetrofitClient.getInstance().getApi().getUserById(uid).enqueue(new Callback<JsonObject>() {

            @Override
            public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                if (response.isSuccessful()) {
                    JsonObject responseObject = response.body();
                    if (responseObject != null) {
                        String status = responseObject.get("status").getAsString();
                        if (status.equals("success")) {
                            JsonArray dataArray = responseObject.getAsJsonArray("data");
                            if (dataArray != null && dataArray.size() > 0) {
                                JsonObject userObject = dataArray.get(0).getAsJsonObject();
                                User user = new Gson().fromJson(userObject, User.class);
                                displayUserDetails(user);
                            } else {
                                displayError("No user data found");
                            }
                        } else {
                            String message = responseObject.get("message").getAsString();
                            displayError(message);
                        }
                    } else {
                        displayError("Response body is null");
                    }
                } else {
                    displayError("Response unsuccessful");
                }
            }

            @Override
            public void onFailure(Call<JsonObject> call, Throwable t) {
                // Handle API call failure
                displayError("Something went wrong");
            }
        });
    }

    private void displayUserDetails(User user) {
        textName.setText("Name:  " + user.getuName());
        textEmail.setText("Email:  " + user.getuEmail());
        textContact.setText("Contact: "+user.getuContact(""));
    }

    private void displayError(String errorMessage) {
        Toast.makeText(ProfileActivity.this, errorMessage, Toast.LENGTH_SHORT).show();
    }

    public void back(View view) {
        // Finish the activity and go back
        finish();
    }
}