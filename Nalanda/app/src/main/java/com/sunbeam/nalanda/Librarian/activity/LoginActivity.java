package com.sunbeam.nalanda.Librarian.activity;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.Toast;

import com.google.gson.JsonObject;
import com.sunbeam.nalanda.Librarian.entity.User;
import com.sunbeam.nalanda.Librarian.utils.RetrofitClient;
import com.sunbeam.nalanda.R;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class LoginActivity extends AppCompatActivity {
    EditText editEmail,editPassword;
    CheckBox checkBoxRememberMe;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        editEmail = findViewById(R.id.editEmail);
        editPassword = findViewById(R.id.editPassword);
        checkBoxRememberMe = findViewById(R.id.checkBox);
    }

    public void Signin(View view){
        User user = new User();
        user.setuEmail(editEmail.getText().toString());
        user.setuPassword(editPassword.getText().toString());

        if (checkBoxRememberMe.isChecked()) {
            getSharedPreferences("libraryM", MODE_PRIVATE).edit().putBoolean("login_status", true).apply();
        }

        RetrofitClient.getInstance().getApi().loginUser(user).enqueue(new Callback<JsonObject>() {
            @Override
            public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                JsonObject responseObject = response.body();
                if (responseObject != null) {
                    JsonObject dataObject = responseObject.getAsJsonObject("data");
                    if (dataObject != null) {
                        int idusers = dataObject.get("idusers").getAsInt();
                        String uName = dataObject.get("uName").getAsString();
                        String uEmail = dataObject.get("uEmail").getAsString();
                        String uContact = dataObject.get("uContact").getAsString();
                        String uCreatedAt = dataObject.get("uCreatedAt").getAsString();

                        // Save user ID to shared preferences
                        getSharedPreferences("libraryM", MODE_PRIVATE).edit().putInt("uID", idusers).apply();

                        // Start the activity
                        startActivity(new Intent(LoginActivity.this, SelectTaskActivity.class));
                        finish();
                    } else {
                        Toast.makeText(LoginActivity.this, "Invalid Credentials", Toast.LENGTH_SHORT).show();
                    }
                }
            }

            @Override
            public void onFailure(Call<JsonObject> call, Throwable t) {
                Toast.makeText(LoginActivity.this, "Something Went Wrong", Toast.LENGTH_SHORT).show();
            }
        });
    }

    public void Signup(View view){
        startActivity(new Intent(this, RegisterActivity.class));
    }
}
