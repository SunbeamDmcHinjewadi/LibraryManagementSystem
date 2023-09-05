package com.sunbeam.nalanda.Librarian.activity;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Context;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.sunbeam.nalanda.Librarian.adapter.BookListAdapter;
import com.sunbeam.nalanda.Librarian.adapter.OrderListAdapter;
import com.sunbeam.nalanda.Librarian.entity.Books;
import com.sunbeam.nalanda.Librarian.entity.Transaction;
import com.sunbeam.nalanda.Librarian.entity.User;
import com.sunbeam.nalanda.Librarian.utils.RetrofitClient;
import com.sunbeam.nalanda.R;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class OrderList extends AppCompatActivity implements OrderListAdapter.OrderList{



    RecyclerView recyclerView2;
    OrderListAdapter orderListAdapter;
    int bookID, bookIdTaken;
    int transactionuid;
    Transaction transaction;
    List<Transaction> transactionList;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_order_list);

        recyclerView2 = findViewById(R.id.recyclerView2);
        transactionList = new ArrayList<>();
       orderListAdapter = new OrderListAdapter(this,transactionList,this);
        recyclerView2.setAdapter(orderListAdapter);
        recyclerView2.setLayoutManager(new GridLayoutManager(this,1));
        transaction = (Transaction) getIntent().getSerializableExtra("transaction");
        getTransactionData();

    }


    void getTransactionData(){
        int uid = getSharedPreferences("libraryM",MODE_PRIVATE).getInt("uID",0);
        transactionList.clear();


        RetrofitClient.getInstance().getApi().trasactionShow(uid).enqueue(new Callback<JsonObject>() {
            @Override
            public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                Log.e("response", response.body().toString());
                if(response.body().getAsJsonObject().get("status").getAsString().equals("success")){
                    JsonArray jsonArray = response.body().getAsJsonObject().get("data").getAsJsonArray();
                    for (JsonElement element :jsonArray) {
                        Transaction transaction = new Transaction();

                        transaction.setIdbooks_taken(element.getAsJsonObject().get("idbooks_taken").getAsInt());
                        bookIdTaken = transaction.getIdbooks_taken();

                        transaction.setBook_id(element.getAsJsonObject().get("book_id").getAsInt());
                         bookID = transaction.getBook_id();

                        transaction.setBook_name(element.getAsJsonObject().get("book_name").getAsString());

                        // Set due_date
                        String dueDateAsString = element.getAsJsonObject().get("due_date").getAsString();
                        java.sql.Date sqlDueDate = java.sql.Date.valueOf(dueDateAsString.substring(0, 10));
                        transaction.setDue_date(sqlDueDate);
                        Log.e("due_date",dueDateAsString );

                        transaction.setFine_amount(element.getAsJsonObject().get("fine_amount").getAsDouble());

                        transaction.setUser_id(uid);
                        transactionuid = transaction.getUser_id();

                        transactionList.add(transaction);
                        Log.e("bhumi", transactionList.toString());

                    }
                    orderListAdapter.notifyDataSetChanged();

                }


            }

            @Override
            public void onFailure(Call<JsonObject> call, Throwable t) {
                Toast.makeText(OrderList.this, "Something Went Wrong", Toast.LENGTH_SHORT).show();
            }
        });
    }


    @Override
    public void refresh() {
        getTransactionData();

    }
}