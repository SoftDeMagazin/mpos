package com.mpos;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.UUID;

import com.facebook.react.ReactActivity;
import android.widget.Toast;
import android.content.Intent;

import com.datecs.fiscalprinter.FiscalPrinterException;
import com.datecs.fiscalprinter.rou.DP25ROU;

import android.os.Bundle;
import android.view.KeyEvent;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothSocket;
import android.app.ProgressDialog;
import android.content.DialogInterface;
import android.content.DialogInterface.OnKeyListener;

public class MainActivity extends ReactActivity {
    private static final int REQUEST_ENABLE_BT = 1;
    private static final int REQUEST_DEVICE = 2;

    private static final UUID SPP_UUID = UUID.fromString("00001101-0000-1000-8000-00805F9B34FB");
	
	private interface MethodInvoker {
        public void invoke() throws IOException;
    }
    
	private BluetoothAdapter mBtAdapter;
	private BluetoothSocket mBtSocket;
	private DP25ROU mFMP;
    
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "mpos";
    }

    @Override
	public void onActivityResult(int requestCode, int resultCode, Intent data) {
		switch (requestCode) {
			case REQUEST_DEVICE: {
				if (resultCode == RESULT_OK) {
					String address = data.getStringExtra(DeviceActivity.EXTRA_ADDRESS);
					connect(address);
				} else {
					finish();
				}
				break;
			}
		}
    }
    
    private void postToast(final String text) {
        runOnUiThread(new Runnable() {			
			@Override
			public void run() {
				Toast.makeText(getApplicationContext(), text, Toast.LENGTH_SHORT).show();
			}
		});
    }

    public void connect(final String address) {
    	invokeHelper(new MethodInvoker() {			
			@Override
			public void invoke() throws IOException {
                mBtAdapter = BluetoothAdapter.getDefaultAdapter();
				final BluetoothDevice device = mBtAdapter.getRemoteDevice(address);
				final BluetoothSocket socket = device.createRfcommSocketToServiceRecord(SPP_UUID);
				socket.connect();
				
				mBtSocket = socket;
				final InputStream in = socket.getInputStream();
				final OutputStream out = socket.getOutputStream();					
				mFMP = new DP25ROU(in, out);
				postToast("Connected");
				
			}
		});    	
	}        
     
    public synchronized void disconnect() {
        if (mFMP != null) {
            mFMP.close();
        }
        
    	if (mBtSocket != null) {    	    
    		try {
				mBtSocket.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
    	}
    }

    private void enableBluetooth() {
    	Intent enableBtIntent = new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE);
	    startActivityForResult(enableBtIntent, REQUEST_ENABLE_BT);	    
    }
    
    private void selectDevice() {
    	Intent selectDevice = new Intent(this, DeviceActivity.class);
	    startActivityForResult(selectDevice, REQUEST_DEVICE);	    
    }
    
    private void invokeHelper(final MethodInvoker invoker) {
    	final ProgressDialog dialog = new ProgressDialog(this);
    	dialog.setCancelable(false);
    	dialog.setCanceledOnTouchOutside(false);
    	dialog.setMessage(getString(R.string.msg_please_wait));
		dialog.setOnKeyListener(new OnKeyListener() {					
			@Override
			public boolean onKey(DialogInterface dialog, int keyCode, KeyEvent event) {
				return true;
			}
		});
		dialog.show();
		
    	final Thread t = new Thread(new Runnable() {			
			@Override
			public void run() {				
				try {
					invoker.invoke();
				} catch (FiscalPrinterException e) { // Fiscal printer error
				    e.printStackTrace();
				    postToast("FiscalPrinterExceptions: " + e.getMessage());
		    	} catch (IOException e) { //Communication error
		    	    e.printStackTrace();
                    postToast("IOException: " + e.getMessage());
		    		disconnect();   		
		    		selectDevice();
		    	} catch (Exception e) { // Critical exception
                    e.printStackTrace();
                    postToast("Exception: " + e.getMessage());
                    disconnect();           
                    selectDevice(); 
                } finally {
		    		dialog.dismiss();
		    	}
			}
		});    	
    	t.start();
    }
}
