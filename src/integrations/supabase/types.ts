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
          },
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
      studio_bookings: {
        Row: {
          client_details: Json
          created_at: string
          event_date: string | null
          event_venue: string | null
          id: number
          package_details: Json
          service_id: number
          status: string | null
          total_price: number
          user_id: string | null
        }
        Insert: {
          client_details: Json
          created_at?: string
          event_date?: string | null
          event_venue?: string | null
          id?: number
          package_details: Json
          service_id: number
          status?: string | null
          total_price: number
          user_id?: string | null
        }
        Update: {
          client_details?: Json
          created_at?: string
          event_date?: string | null
          event_venue?: string | null
          id?: number
          package_details?: Json
          service_id?: number
          status?: string | null
          total_price?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "studio_bookings_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "studio_services"
            referencedColumns: ["id"]
          }
        ]
      }
      premium_bookings: {
        Row: {
          client_details: Json
          created_at: string
          event_date: string | null
          event_venue: string | null
          id: number
          package_details: Json
          package_id: number
          selected_addons: Json | null
          special_requirements: string | null
          status: string | null
          tier_id: number
          time_slot: string | null
          total_price: number
          user_id: string | null
        }
        Insert: {
          client_details?: Json | null
          created_at?: string
          event_date?: string | null
          event_venue?: string | null
          id?: number
          package_details?: Json | null
          package_id: number
          selected_addons?: Json | null
          special_requirements?: string | null
          status?: string | null
          tier_id: number
          time_slot?: string | null
          total_price: number
          user_id?: string | null
        }
        Update: {
          client_details?: Json | null
          created_at?: string
          event_date?: string | null
          event_venue?: string | null
          id?: number
          package_details?: Json | null
          package_id?: number
          selected_addons?: Json | null
          special_requirements?: string | null
          status?: string | null
          tier_id?: number
          time_slot?: string | null
          total_price?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "premium_bookings_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "premium_packages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "premium_bookings_tier_id_fkey"
            columns: ["tier_id"]
            isOneToOne: false
            referencedRelation: "premium_package_tiers"
            referencedColumns: ["id"]
          }
        ]
      }
      premium_package_addons: {
        Row: {
          addon_key: string
          created_at: string
          description: string | null
          id: number
          is_active: boolean | null
          name: string
          package_id: number
          price: number
        }
        Insert: {
          addon_key: string
          created_at?: string
          description?: string | null
          id?: number
          is_active?: boolean | null
          name: string
          package_id: number
          price: number
        }
        Update: {
          addon_key?: string
          created_at?: string
          description?: string | null
          id?: number
          is_active?: boolean | null
          name?: string
          package_id?: number
          price?: number
        }
        Relationships: [
          {
            foreignKeyName: "premium_package_addons_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "premium_packages"
            referencedColumns: ["id"]
          }
        ]
      }
      premium_package_tiers: {
        Row: {
          created_at: string
          display_order: number | null
          features: Json | null
          id: number
          ideal_for: string | null
          is_popular: boolean | null
          package_id: number
          price: number
          tier_key: string
          tier_name: string
        }
        Insert: {
          created_at?: string
          display_order?: number | null
          features?: Json | null
          id?: number
          ideal_for?: string | null
          is_popular?: boolean | null
          package_id: number
          price: number
          tier_key: string
          tier_name: string
        }
        Update: {
          created_at?: string
          display_order?: number | null
          features?: Json | null
          id?: number
          ideal_for?: string | null
          is_popular?: boolean | null
          package_id?: number
          price?: number
          tier_key?: string
          tier_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "premium_package_tiers_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "premium_packages"
            referencedColumns: ["id"]
          }
        ]
      }
      premium_packages: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          id: number
          is_active: boolean
          name: string
          package_key: string
          terms: Json | null
          thumbnail: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: number
          is_active?: boolean
          name: string
          package_key: string
          terms?: Json | null
          thumbnail?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: number
          is_active?: boolean
          name?: string
          package_key?: string
          terms?: Json | null
          thumbnail?: string | null
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
