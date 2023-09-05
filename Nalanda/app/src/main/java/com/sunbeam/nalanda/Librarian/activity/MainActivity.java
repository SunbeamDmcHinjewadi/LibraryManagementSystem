package com.sunbeam.nalanda.Librarian.activity;

import androidx.activity.result.ActivityResult;
import androidx.activity.result.ActivityResultCallback;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;

import com.sunbeam.nalanda.R;
import com.sunbeam.nalanda.R;


import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity {
//    RecyclerView carRecyclerView;
//    List<Books> carsList;
//
//    @Override
//    protected void onCreate(Bundle savedInstanceState) {
//        super.onCreate(savedInstanceState);
//        setContentView(R.layout.activity_main);
//        carRecyclerView = findViewById(R.id.carRecyclerView);
//    }
//
//    @Override
//    public boolean onCreateOptionsMenu(Menu menu) {
//        getMenuInflater().inflate(R.menu.carlist_menu, menu);
//        return super.onCreateOptionsMenu(menu);
//
//    }
//
//    @Override
//    protected void onResume() {
//        super.onResume();
//        //List of  cars fetched from the database.
//        carsList = new CarDBHelper(this).getAllCars();
//        Log.e("db", "main - " + carsList.toString());
//
//        CarListAdapter carListAdapter = new CarListAdapter(this, carsList);
//        carRecyclerView.setAdapter(carListAdapter);
//        carRecyclerView.setLayoutManager(new GridLayoutManager(this, 1));
//
//    }
//
//    @Override
//    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
//        if (item.getTitle().equals("Add"))
//            startActivity(new Intent(this, AddCarActivity.class));
//        else {
//            SharedPreferences preferences = getSharedPreferences("login_status",MODE_PRIVATE);
//            preferences.edit().putBoolean("status",false).commit();
//        }
//        return super.onOptionsItemSelected(item);
//    }
}
