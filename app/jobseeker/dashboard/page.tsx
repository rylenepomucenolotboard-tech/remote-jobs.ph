'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    LayoutDashboard, Briefcase, Calendar, MessageSquare, TrendingUp,
    Users, CheckCircle, Clock, ChevronRight, Send, Bell, Settings,
    User, LogOut, Plus
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
