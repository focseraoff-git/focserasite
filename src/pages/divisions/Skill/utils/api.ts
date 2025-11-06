// src/pages/divisions/Skill/utils/api.ts
import { lmsSupabaseClient } from "../../../../lib/ssupabase";

// ✅ Fetch a full program with modules and content
export async function fetchProgramHierarchy(programId: string) {
  return lmsSupabaseClient
    .from("programs")
    .select(`
      id, title, description,
      modules (
        id, title, day, description,
        content (
          id, type, title, body, code_challenge_id,
          code_challenges (
            id, title, description, language,
            test_cases (input, expected_output)
          )
        )
      )
    `)
    .eq("id", programId)
    .single();
}

// ✅ Fetch a specific module and its content
export async function fetchModuleWithContent(moduleId: string) {
  return lmsSupabaseClient
    .from("modules")
    .select(`
      id, title, day, description, program_id,
      content (
        id, title, type, body, code_challenge_id,
        code_challenges (id, title, description, language)
      )
    `)
    .eq("id", moduleId)
    .single();
}
