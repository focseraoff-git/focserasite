export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      /* ── New schema tables ─────────────────────────────────── */
      app_content: {
        Row: {
          id: string
          screen: string
          section: string
          key_name: string
          content_value: string
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          screen: string
          section: string
          key_name: string
          content_value: string
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          screen?: string
          section?: string
          key_name?: string
          content_value?: string
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      cart_items: {
        Row: {
          id: number
          user_id: string
          item_type: string
          item_id: string
          quantity: number
          metadata: Json | null
          created_at: string | null
        }
        Insert: {
          id?: number
          user_id: string
          item_type: string
          item_id: string
          quantity?: number
          metadata?: Json | null
          created_at?: string | null
        }
        Update: {
          id?: number
          user_id?: string
          item_type?: string
          item_id?: string
          quantity?: number
          metadata?: Json | null
          created_at?: string | null
        }
        Relationships: []
      }
      dine_qr_requests: {
        Row: {
          id: number
          created_at: string
          restaurant_name: string
          contact_name: string
          email: string
          phone: string
          table_count: string | null
          address: string | null
          cuisine_type: string | null
          current_pos: string | null
          details: string | null
        }
        Insert: {
          id?: number
          created_at?: string
          restaurant_name: string
          contact_name: string
          email: string
          phone: string
          table_count?: string | null
          address?: string | null
          cuisine_type?: string | null
          current_pos?: string | null
          details?: string | null
        }
        Update: {
          id?: number
          created_at?: string
          restaurant_name?: string
          contact_name?: string
          email?: string
          phone?: string
          table_count?: string | null
          address?: string | null
          cuisine_type?: string | null
          current_pos?: string | null
          details?: string | null
        }
        Relationships: []
      }
      event_add_ons: {
        Row: {
          id: number
          key: string
          label: string
          description: string | null
          price_min: number | null
          is_active: boolean | null
          created_at: string | null
        }
        Insert: {
          id?: number
          key: string
          label: string
          description?: string | null
          price_min?: number | null
          is_active?: boolean | null
          created_at?: string | null
        }
        Update: {
          id?: number
          key?: string
          label?: string
          description?: string | null
          price_min?: number | null
          is_active?: boolean | null
          created_at?: string | null
        }
        Relationships: []
      }
      gallery_events: {
        Row: {
          id: string
          title: string
          slug: string
          description: string | null
          event_date: string
          cover_image_url: string | null
          google_drive_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description?: string | null
          event_date: string
          cover_image_url?: string | null
          google_drive_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string | null
          event_date?: string
          cover_image_url?: string | null
          google_drive_url?: string | null
          created_at?: string
        }
        Relationships: []
      }
      gallery_photos: {
        Row: {
          id: string
          event_id: string
          image_url: string
          caption: string | null
          display_order: number
          created_at: string
        }
        Insert: {
          id?: string
          event_id: string
          image_url: string
          caption?: string | null
          display_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          event_id?: string
          image_url?: string
          caption?: string | null
          display_order?: number
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "gallery_photos_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "gallery_events"
            referencedColumns: ["id"]
          }
        ]
      }
      home_benefits: {
        Row: {
          id: string
          title: string
          description: string
          icon_name: string
          accent_hex: string | null
          is_active: boolean | null
          display_order: number | null
          created_at: string | null
        }
        Insert: {
          id?: string
          title: string
          description: string
          icon_name: string
          accent_hex?: string | null
          is_active?: boolean | null
          display_order?: number | null
          created_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          description?: string
          icon_name?: string
          accent_hex?: string | null
          is_active?: boolean | null
          display_order?: number | null
          created_at?: string | null
        }
        Relationships: []
      }
      home_gallery: {
        Row: {
          id: string
          title: string
          caption: string
          image_url: string
          type: string
          display_order: number
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          caption: string
          image_url: string
          type?: string
          display_order?: number
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          caption?: string
          image_url?: string
          type?: string
          display_order?: number
          is_active?: boolean
          created_at?: string
        }
        Relationships: []
      }
      home_header_videos: {
        Row: {
          id: string
          title: string
          video_url: string | null
          thumbnail_url: string | null
          action_link: string | null
          display_order: number | null
          is_active: boolean | null
          created_at: string | null
        }
        Insert: {
          id?: string
          title: string
          video_url?: string | null
          thumbnail_url?: string | null
          action_link?: string | null
          display_order?: number | null
          is_active?: boolean | null
          created_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          video_url?: string | null
          thumbnail_url?: string | null
          action_link?: string | null
          display_order?: number | null
          is_active?: boolean | null
          created_at?: string | null
        }
        Relationships: []
      }
      home_partner_type_details: {
        Row: {
          id: string
          home_partner_type_id: string
          hero_description: string | null
          inclusions: Json | null
          styles: Json | null
          examples: Json | null
          workflow: Json | null
          deliverables: Json | null
          use_cases: Json | null
          tips: Json | null
          faqs: Json | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          home_partner_type_id: string
          hero_description?: string | null
          inclusions?: Json | null
          styles?: Json | null
          examples?: Json | null
          workflow?: Json | null
          deliverables?: Json | null
          use_cases?: Json | null
          tips?: Json | null
          faqs?: Json | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          home_partner_type_id?: string
          hero_description?: string | null
          inclusions?: Json | null
          styles?: Json | null
          examples?: Json | null
          workflow?: Json | null
          deliverables?: Json | null
          use_cases?: Json | null
          tips?: Json | null
          faqs?: Json | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      home_partner_types: {
        Row: {
          id: string
          title: string
          description: string | null
          category: string
          image_asset: string | null
          tag: string | null
          accent_hex: string | null
          icon_name: string | null
          route: string | null
          is_active: boolean | null
          display_order: number | null
          created_at: string | null
          image_url: string | null
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          category: string
          image_asset?: string | null
          tag?: string | null
          accent_hex?: string | null
          icon_name?: string | null
          route?: string | null
          is_active?: boolean | null
          display_order?: number | null
          created_at?: string | null
          image_url?: string | null
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          category?: string
          image_asset?: string | null
          tag?: string | null
          accent_hex?: string | null
          icon_name?: string | null
          route?: string | null
          is_active?: boolean | null
          display_order?: number | null
          created_at?: string | null
          image_url?: string | null
        }
        Relationships: []
      }
      home_testimonials: {
        Row: {
          id: string
          author: string
          role: string | null
          review_text: string
          rating: number | null
          accent_hex: string | null
          is_active: boolean | null
          display_order: number | null
          created_at: string | null
        }
        Insert: {
          id?: string
          author: string
          role?: string | null
          review_text: string
          rating?: number | null
          accent_hex?: string | null
          is_active?: boolean | null
          display_order?: number | null
          created_at?: string | null
        }
        Update: {
          id?: string
          author?: string
          role?: string | null
          review_text?: string
          rating?: number | null
          accent_hex?: string | null
          is_active?: boolean | null
          display_order?: number | null
          created_at?: string | null
        }
        Relationships: []
      }
      identity_settings: {
        Row: {
          id: string
          profile_id: string
          custom_cta_text: string | null
          custom_cta_url: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          profile_id: string
          custom_cta_text?: string | null
          custom_cta_url?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          profile_id?: string
          custom_cta_text?: string | null
          custom_cta_url?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      order_items: {
        Row: {
          id: number
          order_id: number
          user_id: string
          item_type: string
          item_id: string
          quantity: number
          price: number
          metadata: Json | null
          created_at: string | null
        }
        Insert: {
          id?: number
          order_id: number
          user_id: string
          item_type: string
          item_id: string
          quantity: number
          price: number
          metadata?: Json | null
          created_at?: string | null
        }
        Update: {
          id?: number
          order_id?: number
          user_id?: string
          item_type?: string
          item_id?: string
          quantity?: number
          price?: number
          metadata?: Json | null
          created_at?: string | null
        }
        Relationships: []
      }
      orders: {
        Row: {
          id: number
          user_id: string
          total_amount: number
          status: string
          created_at: string | null
        }
        Insert: {
          id?: number
          user_id: string
          total_amount: number
          status?: string
          created_at?: string | null
        }
        Update: {
          id?: number
          user_id?: string
          total_amount?: number
          status?: string
          created_at?: string | null
        }
        Relationships: []
      }
      package_category_details: {
        Row: {
          id: string
          package_id: string | null
          hero_description: string | null
          inclusions: Json | null
          styles: Json | null
          examples: Json | null
          workflow: Json | null
          deliverables: Json | null
          use_cases: Json | null
          tips: Json | null
          faqs: Json | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          package_id?: string | null
          hero_description?: string | null
          inclusions?: Json | null
          styles?: Json | null
          examples?: Json | null
          workflow?: Json | null
          deliverables?: Json | null
          use_cases?: Json | null
          tips?: Json | null
          faqs?: Json | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          package_id?: string | null
          hero_description?: string | null
          inclusions?: Json | null
          styles?: Json | null
          examples?: Json | null
          workflow?: Json | null
          deliverables?: Json | null
          use_cases?: Json | null
          tips?: Json | null
          faqs?: Json | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      partner_assignments: {
        Row: {
          id: string
          partner_id: string | null
          client_name: string
          service_name: string
          location: string
          schedule_time: string
          status: string
          price: number
          client_notes: string | null
          workflow_data: Json | null
          created_at: string | null
          updated_at: string | null
          otp_code: string | null
          service_started_at: string | null
          user_id: string | null
          latitude: number | null
          longitude: number | null
          last_location_update: string | null
          service_ended_at: string | null
          completion_photos: Json | null
          final_amount: number | null
          payment_status: string | null
          payment_method: string | null
          payment_link: string | null
          show_location: boolean | null
          heading: number | null
          user_latitude: number | null
          user_longitude: number | null
          user_heading: number | null
          user_last_update: string | null
          booking_table: string
          identity_revealed: boolean
          booking_id: string
          user_phone: string | null
          workflow_step: number | null
          source_table: string | null
          priority: number | null
          user_to_partner_rating: number | null
          user_to_partner_review: string | null
          partner_to_user_rating: number | null
          partner_to_user_review: string | null
          speed: number | null
          accuracy: number | null
          user_speed: number | null
          user_accuracy: number | null
          reveal_partner_phone: boolean | null
          reveal_customer_phone: boolean | null
        }
        Insert: {
          id?: string
          partner_id?: string | null
          client_name: string
          service_name: string
          location: string
          schedule_time: string
          status?: string
          price?: number
          client_notes?: string | null
          workflow_data?: Json | null
          created_at?: string | null
          updated_at?: string | null
          otp_code?: string | null
          service_started_at?: string | null
          user_id?: string | null
          latitude?: number | null
          longitude?: number | null
          last_location_update?: string | null
          service_ended_at?: string | null
          completion_photos?: Json | null
          final_amount?: number | null
          payment_status?: string | null
          payment_method?: string | null
          payment_link?: string | null
          show_location?: boolean | null
          heading?: number | null
          user_latitude?: number | null
          user_longitude?: number | null
          user_heading?: number | null
          user_last_update?: string | null
          booking_table?: string
          identity_revealed?: boolean
          booking_id: string
          user_phone?: string | null
          workflow_step?: number | null
          source_table?: string | null
          priority?: number | null
          user_to_partner_rating?: number | null
          user_to_partner_review?: string | null
          partner_to_user_rating?: number | null
          partner_to_user_review?: string | null
          speed?: number | null
          accuracy?: number | null
          user_speed?: number | null
          user_accuracy?: number | null
          reveal_partner_phone?: boolean | null
          reveal_customer_phone?: boolean | null
        }
        Update: {
          id?: string
          partner_id?: string | null
          client_name?: string
          service_name?: string
          location?: string
          schedule_time?: string
          status?: string
          price?: number
          [key: string]: unknown
        }
        Relationships: []
      }
      partner_category_details: {
        Row: {
          partner_id: string
          hero_description: string
          inclusions: Json | null
          styles: Json | null
          examples: Json | null
          workflow: Json | null
          deliverables: Json | null
          use_cases: Json | null
          tips: Json | null
          faqs: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          partner_id: string
          hero_description: string
          inclusions?: Json | null
          styles?: Json | null
          examples?: Json | null
          workflow?: Json | null
          deliverables?: Json | null
          use_cases?: Json | null
          tips?: Json | null
          faqs?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          partner_id?: string
          hero_description?: string
          inclusions?: Json | null
          styles?: Json | null
          examples?: Json | null
          workflow?: Json | null
          deliverables?: Json | null
          use_cases?: Json | null
          tips?: Json | null
          faqs?: Json | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      partner_gallery: {
        Row: {
          id: string
          title: string
          caption: string
          video_url: string
          type: string | null
          display_order: number | null
          is_active: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          title: string
          caption: string
          video_url: string
          type?: string | null
          display_order?: number | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          caption?: string
          video_url?: string
          type?: string | null
          display_order?: number | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      partner_profiles: {
        Row: {
          id: string
          category: string
          sub_category: string | null
          price: number | null
          price_unit: string | null
          bio: string | null
          experience_years: number | null
          is_verified: boolean | null
          rating: number | null
          reviews_count: number | null
          portfolio_images: string[] | null
          created_at: string | null
          user_id: string | null
          phone: string | null
          email: string | null
          name: string | null
          avatar_url: string | null
          latitude: number | null
          longitude: number | null
          is_online: boolean | null
          last_active: string | null
          avg_response_time: number | null
          is_available: boolean | null
        }
        Insert: {
          id?: string
          category: string
          sub_category?: string | null
          price?: number | null
          price_unit?: string | null
          bio?: string | null
          experience_years?: number | null
          is_verified?: boolean | null
          rating?: number | null
          reviews_count?: number | null
          portfolio_images?: string[] | null
          created_at?: string | null
          user_id?: string | null
          phone?: string | null
          email?: string | null
          name?: string | null
          avatar_url?: string | null
          latitude?: number | null
          longitude?: number | null
          is_online?: boolean | null
          last_active?: string | null
          avg_response_time?: number | null
          is_available?: boolean | null
        }
        Update: {
          id?: string
          category?: string
          sub_category?: string | null
          [key: string]: unknown
        }
        Relationships: []
      }
      popup_logs: {
        Row: {
          id: string
          user_id: string | null
          popup_id: string | null
          shown_at: string | null
          clicked: boolean | null
          claimed: boolean | null
          metadata: Json | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          popup_id?: string | null
          shown_at?: string | null
          clicked?: boolean | null
          claimed?: boolean | null
          metadata?: Json | null
        }
        Update: {
          id?: string
          user_id?: string | null
          popup_id?: string | null
          shown_at?: string | null
          clicked?: boolean | null
          claimed?: boolean | null
          metadata?: Json | null
        }
        Relationships: []
      }
      popups: {
        Row: {
          id: string
          title: string
          description: string | null
          image_url: string | null
          popup_type: string
          priority: number
          start_time: string
          end_time: string
          is_active: boolean
          target_screen: string | null
          user_segment: string | null
          action_type: string | null
          action_value: string | null
          show_once: boolean | null
          max_shows: number | null
          max_claims: number | null
          cooldown_minutes: number | null
          created_at: string | null
          updated_at: string | null
          action_config: Json | null
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          image_url?: string | null
          popup_type?: string
          priority?: number
          start_time?: string
          end_time?: string
          is_active?: boolean
          target_screen?: string | null
          user_segment?: string | null
          action_type?: string | null
          action_value?: string | null
          show_once?: boolean | null
          max_shows?: number | null
          max_claims?: number | null
          cooldown_minutes?: number | null
          created_at?: string | null
          updated_at?: string | null
          action_config?: Json | null
        }
        Update: {
          id?: string
          title?: string
          [key: string]: unknown
        }
        Relationships: []
      }
      professional_requests: {
        Row: {
          id: string
          category: string
          services_needed: string[]
          description: string | null
          media_urls: string[] | null
          location: string | null
          preferred_schedule: string | null
          budget_range: string | null
          contact_preference: string | null
          status: string
          client_id: string | null
          contact_info: Json
          created_at: string
          updated_at: string
          quantity: number
        }
        Insert: {
          id?: string
          category: string
          services_needed?: string[]
          description?: string | null
          media_urls?: string[] | null
          location?: string | null
          preferred_schedule?: string | null
          budget_range?: string | null
          contact_preference?: string | null
          status?: string
          client_id?: string | null
          contact_info?: Json
          created_at?: string
          updated_at?: string
          quantity?: number
        }
        Update: {
          id?: string
          category?: string
          [key: string]: unknown
        }
        Relationships: []
      }
      profiles: {
        Row: {
          id: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          website: string | null
          role: string | null
          phone_number: string | null
          email: string | null
          updated_at: string | null
          show_recommendations: boolean | null
          bio: string | null
          location: string | null
          followers: number | null
          following: number | null
        }
        Insert: {
          id: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
          role?: string | null
          phone_number?: string | null
          email?: string | null
          updated_at?: string | null
          show_recommendations?: boolean | null
          bio?: string | null
          location?: string | null
          followers?: number | null
          following?: number | null
        }
        Update: {
          id?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
          role?: string | null
          phone_number?: string | null
          email?: string | null
          updated_at?: string | null
          show_recommendations?: boolean | null
          bio?: string | null
          location?: string | null
          followers?: number | null
          following?: number | null
        }
        Relationships: []
      }
      promocodes: {
        Row: {
          id: string
          code: string
          discount_type: string
          discount_value: number
          min_booking_amount: number | null
          max_discount_amount: number | null
          expiry_date: string | null
          usage_limit: number | null
          usage_count: number | null
          is_active: boolean | null
          created_at: string | null
          updated_at: string | null
          description: string | null
          terms_and_conditions: string[] | null
        }
        Insert: {
          id?: string
          code: string
          discount_type: string
          discount_value: number
          min_booking_amount?: number | null
          max_discount_amount?: number | null
          expiry_date?: string | null
          usage_limit?: number | null
          usage_count?: number | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
          description?: string | null
          terms_and_conditions?: string[] | null
        }
        Update: {
          id?: string
          code?: string
          discount_type?: string
          discount_value?: number
          [key: string]: unknown
        }
        Relationships: []
      }
      promotions: {
        Row: {
          id: string
          title: string
          description: string
          type: string
          image_url: string | null
          action_link: string | null
          is_active: boolean | null
          valid_until: string | null
          created_at: string | null
          promocode: string | null
        }
        Insert: {
          id?: string
          title: string
          description: string
          type: string
          image_url?: string | null
          action_link?: string | null
          is_active?: boolean | null
          valid_until?: string | null
          created_at?: string | null
          promocode?: string | null
        }
        Update: {
          id?: string
          title?: string
          description?: string
          type?: string
          [key: string]: unknown
        }
        Relationships: []
      }
      promptx_bookings: {
        Row: {
          id: string
          student_name: string
          class_level: string
          parent_name: string
          mobile: string
          email: string
          phonepe_txn_id: string | null
          phonepe_merchant_txn_id: string | null
          payment_status: string
          amount: number
          currency: string | null
          created_at: string | null
          order_id: string | null
          transaction_fee: number | null
          total_paid: number | null
          notes: string | null
          updated_at: string | null
          cashfree_payment_id: string | null
          ticket_sent: boolean | null
          school_name: string | null
          identity_revealed: boolean | null
          partner_id: string | null
          user_id: string | null
          otp_code: string | null
          show_location: boolean | null
          workflow_step: number | null
        }
        Insert: {
          id?: string
          student_name: string
          class_level: string
          parent_name: string
          mobile: string
          email: string
          phonepe_txn_id?: string | null
          phonepe_merchant_txn_id?: string | null
          payment_status?: string
          amount?: number
          currency?: string | null
          created_at?: string | null
          order_id?: string | null
          transaction_fee?: number | null
          total_paid?: number | null
          notes?: string | null
          updated_at?: string | null
          cashfree_payment_id?: string | null
          ticket_sent?: boolean | null
          school_name?: string | null
          identity_revealed?: boolean | null
          partner_id?: string | null
          user_id?: string | null
          otp_code?: string | null
          show_location?: boolean | null
          workflow_step?: number | null
        }
        Update: {
          id?: string
          student_name?: string
          class_level?: string
          [key: string]: unknown
        }
        Relationships: []
      }
      saved_addresses: {
        Row: {
          id: string
          user_id: string
          title: string
          address: string
          latitude: number
          longitude: number
          landmark: string | null
          type: string
          created_at: string
          flat_no: string | null
          apartment_name: string | null
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          address: string
          latitude: number
          longitude: number
          landmark?: string | null
          type: string
          created_at?: string
          flat_no?: string | null
          apartment_name?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          address?: string
          latitude?: number
          longitude?: number
          landmark?: string | null
          type?: string
          created_at?: string
          flat_no?: string | null
          apartment_name?: string | null
        }
        Relationships: []
      }
      service_reviews: {
        Row: {
          id: string
          booking_id: string
          source_table: string
          reviewer_id: string | null
          rating: number | null
          review_text: string | null
          is_partner_to_user: boolean | null
          created_at: string | null
        }
        Insert: {
          id?: string
          booking_id: string
          source_table: string
          reviewer_id?: string | null
          rating?: number | null
          review_text?: string | null
          is_partner_to_user?: boolean | null
          created_at?: string | null
        }
        Update: {
          id?: string
          booking_id?: string
          source_table?: string
          [key: string]: unknown
        }
        Relationships: []
      }
      studio_addons: {
        Row: {
          id: number
          key: string
          label: string
          price_min: number | null
          price_max: number | null
          description: string | null
          created_at: string | null
        }
        Insert: {
          id?: number
          key: string
          label: string
          price_min?: number | null
          price_max?: number | null
          description?: string | null
          created_at?: string | null
        }
        Update: {
          id?: number
          key?: string
          label?: string
          price_min?: number | null
          price_max?: number | null
          description?: string | null
          created_at?: string | null
        }
        Relationships: []
      }
      system_config: {
        Row: {
          key: string
          value: string
          description: string | null
          updated_at: string | null
        }
        Insert: {
          key: string
          value: string
          description?: string | null
          updated_at?: string | null
        }
        Update: {
          key?: string
          value?: string
          description?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      transactions: {
        Row: {
          id: string
          user_id: string | null
          amount: number
          type: string | null
          source: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          amount: number
          type?: string | null
          source?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          amount?: number
          type?: string | null
          source?: string | null
          created_at?: string | null
        }
        Relationships: []
      }
      unified_bookings: {
        Row: {
          id: string
          user_id: string | null
          partner_id: string | null
          domain: string
          source_table: string
          source_id: string
          total_price: number | null
          status: string | null
          booking_date: string | null
          booking_time: string | null
          location: string | null
          latitude: number | null
          longitude: number | null
          customer_name: string | null
          customer_email: string | null
          customer_phone: string | null
          payment_status: string | null
          payment_method: string | null
          cf_order_id: string | null
          metadata: Json | null
          created_at: string | null
          updated_at: string | null
          identity_revealed: boolean | null
          show_location: boolean | null
          otp_code: string | null
          workflow_step: number | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          partner_id?: string | null
          domain: string
          source_table: string
          source_id: string
          total_price?: number | null
          status?: string | null
          booking_date?: string | null
          booking_time?: string | null
          location?: string | null
          latitude?: number | null
          longitude?: number | null
          customer_name?: string | null
          customer_email?: string | null
          customer_phone?: string | null
          payment_status?: string | null
          payment_method?: string | null
          cf_order_id?: string | null
          metadata?: Json | null
          created_at?: string | null
          updated_at?: string | null
          identity_revealed?: boolean | null
          show_location?: boolean | null
          otp_code?: string | null
          workflow_step?: number | null
        }
        Update: {
          id?: string
          user_id?: string | null
          partner_id?: string | null
          domain?: string
          source_table?: string
          source_id?: string
          total_price?: number | null
          status?: string | null
          booking_date?: string | null
          location?: string | null
          customer_name?: string | null
          customer_email?: string | null
          customer_phone?: string | null
          payment_status?: string | null
          metadata?: Json | null
          [key: string]: unknown
        }
        Relationships: []
      }
      unified_packages: {
        Row: {
          id: string
          domain: string
          source_table: string
          source_id: string
          name: string
          description: string | null
          price: number | null
          thumbnail: string | null
          is_active: boolean | null
          metadata: Json | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          domain: string
          source_table: string
          source_id: string
          name: string
          description?: string | null
          price?: number | null
          thumbnail?: string | null
          is_active?: boolean | null
          metadata?: Json | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          domain?: string
          source_table?: string
          source_id?: string
          name?: string
          description?: string | null
          price?: number | null
          thumbnail?: string | null
          is_active?: boolean | null
          metadata?: Json | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      unified_quotes: {
        Row: {
          id: string
          user_id: string | null
          partner_id: string | null
          domain: string
          source_table: string
          source_id: string
          details: string | null
          status: string | null
          metadata: Json | null
          created_at: string | null
          updated_at: string | null
          identity_revealed: boolean | null
          show_location: boolean | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          partner_id?: string | null
          domain: string
          source_table: string
          source_id: string
          details?: string | null
          status?: string | null
          metadata?: Json | null
          created_at?: string | null
          updated_at?: string | null
          identity_revealed?: boolean | null
          show_location?: boolean | null
        }
        Update: {
          id?: string
          user_id?: string | null
          partner_id?: string | null
          domain?: string
          source_table?: string
          source_id?: string
          details?: string | null
          status?: string | null
          metadata?: Json | null
          [key: string]: unknown
        }
        Relationships: []
      }
      wallet: {
        Row: {
          user_id: string
          balance: number | null
          updated_at: string | null
        }
        Insert: {
          user_id: string
          balance?: number | null
          updated_at?: string | null
        }
        Update: {
          user_id?: string
          balance?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      wallet_transactions: {
        Row: {
          id: string
          wallet_id: string
          amount: number
          type: string
          description: string | null
          reference_id: string | null
          status: string
          created_at: string | null
          metadata: Json | null
        }
        Insert: {
          id?: string
          wallet_id: string
          amount: number
          type: string
          description?: string | null
          reference_id?: string | null
          status?: string
          created_at?: string | null
          metadata?: Json | null
        }
        Update: {
          id?: string
          wallet_id?: string
          amount?: number
          type?: string
          [key: string]: unknown
        }
        Relationships: []
      }
      wallets: {
        Row: {
          id: string
          user_id: string
          balance: number
          currency: string
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          balance?: number
          currency?: string
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          balance?: number
          currency?: string
          [key: string]: unknown
        }
        Relationships: []
      }
      wishlist: {
        Row: {
          id: number
          user_id: string
          item_type: string
          item_id: string
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: number
          user_id: string
          item_type: string
          item_id: string
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          item_type?: string
          item_id?: string
          metadata?: Json | null
          created_at?: string
        }
        Relationships: []
      }
      /* ── Legacy ArenaX tables (still used by ArenaX sub-app) ── */
      admin_users: {
        Row: {
          created_at: string
          email: string
          id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
        }
        Relationships: []
      }
      game_card_bookings: {
        Row: {
          card_code: string | null
          created_at: string
          email: string
          flat_number: string
          full_name: string
          id: string
          number_of_cards: number
          participant_names: string | null
          phone: string
          total_balance: number | null
          used_balance: number | null
        }
        Insert: {
          card_code?: string | null
          created_at?: string
          email: string
          flat_number: string
          full_name: string
          id?: string
          number_of_cards?: number
          participant_names?: string | null
          phone: string
          total_balance?: number | null
          used_balance?: number | null
        }
        Update: {
          card_code?: string | null
          created_at?: string
          email?: string
          flat_number?: string
          full_name?: string
          id?: string
          number_of_cards?: number
          participant_names?: string | null
          phone?: string
          total_balance?: number | null
          used_balance?: number | null
        }
        Relationships: []
      }
      game_plays: {
        Row: {
          booking_id: string | null
          created_at: string
          game_name: string
          id: string
          played_at: string
        }
        Insert: {
          booking_id?: string | null
          created_at?: string
          game_name: string
          id?: string
          played_at?: string
        }
        Update: {
          booking_id?: string | null
          created_at?: string
          game_name?: string
          id?: string
          played_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "game_plays_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "game_card_bookings"
            referencedColumns: ["id"]
          }
        ]
      }
      game_registrations: {
        Row: {
          age: number
          created_at: string
          email: string
          flat_number: string
          full_name: string
          game_type: string
          id: string
          phone: string
          preferred_day: string
          preferred_time_slot: string | null
        }
        Insert: {
          age: number
          created_at?: string
          email: string
          flat_number: string
          full_name: string
          game_type: string
          id?: string
          phone: string
          preferred_day: string
          preferred_time_slot?: string | null
        }
        Update: {
          age?: number
          created_at?: string
          email?: string
          flat_number?: string
          full_name?: string
          game_type?: string
          id?: string
          phone?: string
          preferred_day?: string
          preferred_time_slot?: string | null
        }
        Relationships: []
      }
      volunteers: {
        Row: {
          age: number
          created_at: string
          email: string
          experience: string | null
          flat_number: string
          full_name: string
          id: string
          phone: string
          preferred_role: string | null
        }
        Insert: {
          age: number
          created_at?: string
          email: string
          experience?: string | null
          flat_number: string
          full_name: string
          id?: string
          phone: string
          preferred_role?: string | null
        }
        Update: {
          age?: number
          created_at?: string
          email?: string
          experience?: string | null
          flat_number?: string
          full_name?: string
          id?: string
          phone?: string
          preferred_role?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
