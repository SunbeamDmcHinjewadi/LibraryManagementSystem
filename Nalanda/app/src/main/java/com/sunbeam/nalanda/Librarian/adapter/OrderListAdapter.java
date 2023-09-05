package com.sunbeam.nalanda.Librarian.adapter;

import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.google.gson.JsonObject;
import com.sunbeam.nalanda.Librarian.activity.BookDetailsActivity;
import com.sunbeam.nalanda.Librarian.activity.OrderList;
import com.sunbeam.nalanda.Librarian.activity.ProfileActivity;
import com.sunbeam.nalanda.Librarian.activity.SelectTaskActivity;
import com.sunbeam.nalanda.Librarian.entity.Books;
import com.sunbeam.nalanda.Librarian.entity.Transaction;
import com.sunbeam.nalanda.Librarian.utils.RetrofitClient;
import com.sunbeam.nalanda.R;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Locale;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class OrderListAdapter extends RecyclerView.Adapter<OrderListAdapter.MyViewHolder>{

    public interface OrderList {
        public void refresh();
    }
    Context context;
    List<Transaction> transactionList;

    OrderList listner;

    public OrderListAdapter(Context context, List<Transaction> transactionList, OrderList listner) {
        this.context = context;
        this.transactionList = transactionList;
        this.listner=listner;
    }



    @NonNull
    @Override
    public OrderListAdapter.MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.transaction_list,null);
        return new OrderListAdapter.MyViewHolder(view);
    }




    @Override
    public void onBindViewHolder(@NonNull OrderListAdapter.MyViewHolder holder, int position) {
        Transaction transaction = transactionList.get(position);
        holder.textBookName.setText(transaction.getBook_name());
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd", Locale.getDefault());
        String formattedDueDate = sdf.format(transaction.getDue_date());
        holder.textDueDate.setText(formattedDueDate);
        holder.textFine.setText(String.valueOf(transaction.getFine_amount()));

        if(transaction.isReturned())
        {
            holder.btnReturn.setVisibility(View.GONE);
            holder.textReturn.setVisibility(View.GONE);
        } else {
            holder.btnReturn.setVisibility(View.VISIBLE);
            holder.textReturn.setVisibility(View.VISIBLE);

        }

    }





    @Override
    public int getItemCount() {
        return transactionList.size();
    }



    class MyViewHolder extends RecyclerView.ViewHolder{

        TextView  textBookName, textDueDate, textFine,textReturn;
        Button btnReturn;
        public MyViewHolder(@NonNull View itemView) {
            super(itemView);

            textBookName =itemView.findViewById(R.id.textBookName);
            textDueDate = itemView.findViewById(R.id.textDueDate);
            textFine = itemView.findViewById(R.id.textFine);
            btnReturn = itemView.findViewById(R.id.btnReturn);
            textReturn = itemView.findViewById(R.id.textReturn);

            itemView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Intent intent = new Intent(context, OrderList.class);
                    intent.putExtra("transaction", transactionList.get(getAdapterPosition()));
                    context.startActivity(intent);
                }
            });

            btnReturn.setOnClickListener(new View.OnClickListener() {

                @Override
                public void onClick(View view) {
                    Transaction transaction = new Transaction();
                    transaction = transactionList.get(getAdapterPosition());
                    int bookIdTaken = transaction.getIdbooks_taken();
                    int uid = transaction.getUser_id();
                    int bid = transaction.getBook_id();

                    RetrofitClient.getInstance().getApi().returnBook(bookIdTaken,uid, bid).enqueue(new Callback<JsonObject>() {

                        @Override
                        public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                            Log.e("response",response.body().toString());
                            if(response.body().getAsJsonObject().get("status").getAsString().equals("success")){
                                Toast.makeText(context, "Successfully returned ", Toast.LENGTH_SHORT).show();
                                transaction.setReturned(true);

                                listner.refresh();
                            }

                        }
                        @Override
                        public void onFailure(Call<JsonObject> call, Throwable t) {
                            Toast.makeText(context, "Something went wrong ", Toast.LENGTH_SHORT).show();

                        }

                    });
                }
            });
        }
    }
}