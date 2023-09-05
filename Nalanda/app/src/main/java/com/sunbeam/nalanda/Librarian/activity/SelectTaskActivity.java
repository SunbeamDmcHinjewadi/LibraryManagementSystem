package com.sunbeam.nalanda.Librarian.activity;

import android.content.Intent;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import com.sunbeam.nalanda.R;

public class SelectTaskActivity extends AppCompatActivity
{
Button BtnViewBook, BtnAddBook;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_selecttask);
        BtnViewBook = findViewById(R.id.ViewBook);
        BtnAddBook = findViewById(R.id.AddBook);

    }


    public void ViewBooks(View view){
        startActivity(new Intent(this,BooklistActivity.class));
    }

    public void OrderBooks(View view){
        startActivity(new Intent(this, OrderList.class));

    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.profile,menu);

        return super.onCreateOptionsMenu(menu);
    }


    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        int itemId = item.getItemId();
        if (itemId == R.id.profile) {
            // Start the DetailsActivity when the profile menu item is selected
            Intent intent = new Intent(SelectTaskActivity.this, ProfileActivity.class);
            startActivity(intent);
            return true;
        }else if (itemId == R.id.logout) {

            // Clear login status and finish the activity
            getSharedPreferences("library",MODE_PRIVATE).edit().putBoolean("login_status",false).apply();
            Intent intent = new Intent(SelectTaskActivity.this, LoginActivity.class);
            startActivity(intent);
            return true;
        }

        return super.onOptionsItemSelected(item);
    }
}
