package com.sunbeam.nalanda.Librarian.activity;

import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import com.google.gson.JsonObject;
import com.sunbeam.nalanda.Librarian.entity.User;
import com.sunbeam.nalanda.Librarian.utils.RetrofitClient;
import com.sunbeam.nalanda.R;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


public class RegisterActivity extends AppCompatActivity {
    EditText editName,editEmail,editPhone,editPassword,confirmEditPassword;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);
        editName = findViewById(R.id.editName);
        editEmail = findViewById(R.id.editEmail);
        editPhone = findViewById(R.id.editPhone);
        editPassword = findViewById(R.id.editPassword);
        confirmEditPassword = findViewById(R.id.confirmEditPassword);
    }

    public void register(View view){
        User user = validateUser();
        if(user!=null){
            RetrofitClient.getInstance().getApi().registerUser(user).enqueue(new Callback<JsonObject>() {
                @Override
                public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                    if(response.body().getAsJsonObject().get("status").getAsString().equals("success"))
                    {
                        Toast.makeText(RegisterActivity.this, "User Registered Successfully", Toast.LENGTH_SHORT).show();
                        finish();
                    }
                }

                @Override
                public void onFailure(Call<JsonObject> call, Throwable t) {
                    Toast.makeText(RegisterActivity.this, "Something Went Wrong", Toast.LENGTH_SHORT).show();
                }
            });
        }
    }




    private User validateUser() {
        String password = editPassword.getText().toString();
        String confirmPassword = confirmEditPassword.getText().toString();
        if(password.equals(confirmPassword))
        {
            User user = new User();
            user.setuName(editName.getText().toString());
            user.setuEmail(editEmail.getText().toString());
            user.setuContact(editPhone.getText().toString());
            user.setuPassword(password);
            return user;
        }
        else {
            Toast.makeText(this, "passwords do not match", Toast.LENGTH_SHORT).show();
            return null;
        }
    }
    public  void cancel(View view){
       finish();
    }
}