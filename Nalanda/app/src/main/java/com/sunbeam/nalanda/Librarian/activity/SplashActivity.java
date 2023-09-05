package com.sunbeam.nalanda.Librarian.activity;
import androidx.appcompat.app.AppCompatActivity;
import android.content.Intent;
import android.os.Bundle;
import android.view.animation.AnimationUtils;
import android.widget.ImageView;
import com.sunbeam.nalanda.R;

public class SplashActivity extends AppCompatActivity {
    ImageView imageView;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash);
        imageView = findViewById(R.id.imageView);
        imageView.startAnimation(AnimationUtils.loadAnimation(this,R.anim.star));

        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    Thread.sleep(3200);
                    startActivity(new Intent(SplashActivity.this, LoginActivity.class));
                    finish();

                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }).start();

    }
}