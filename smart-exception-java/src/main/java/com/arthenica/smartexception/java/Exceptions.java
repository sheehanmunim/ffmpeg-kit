package com.arthenica.smartexception.java;

import java.io.PrintWriter;
import java.io.StringWriter;

/**
 * Smart Exception library replacement for ffmpeg-kit compatibility.
 * This class provides the missing Exceptions functionality that was previously
 * provided by the com.arthenica:smart-exception-java dependency.
 */
public class Exceptions {
    
    /**
     * Converts an exception's stack trace to a string format.
     * 
     * @param throwable The exception to get the stack trace from
     * @return A string representation of the stack trace, prefixed with a newline
     */
    public static String getStackTraceString(Throwable throwable) {
        if (throwable == null) {
            return "\n<null>";
        }
        
        try {
            StringWriter stringWriter = new StringWriter();
            PrintWriter printWriter = new PrintWriter(stringWriter);
            throwable.printStackTrace(printWriter);
            printWriter.close();
            return "\n" + stringWriter.toString();
        } catch (Exception e) {
            return "\n<error getting stack trace: " + e.getMessage() + ">";
        }
    }
    
    /**
     * Registers a root package for exception handling.
     * This is a no-op implementation for compatibility.
     * 
     * @param packageName The package name to register
     */
    public static void registerRootPackage(String packageName) {
        // No-op implementation for compatibility
        // The original smart-exception library used this for shorter stack traces
        // but it's not critical for ffmpeg-kit functionality
    }
} 