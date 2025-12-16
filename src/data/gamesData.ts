import { 
  Target, Users, Footprints, Puzzle, Dices, 
  Swords, Zap, Music, Bomb, Shield, 
  Gamepad2, Trophy, Star
} from "lucide-react";

export interface Game {
  id: string;
  name: string;
  category: string;
  icon: any;
  description: string;
  fullDescription: string;
  rules: string[];
  ageGroup: string;
  duration: string;
  players: string;
  price: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

export const games: Game[] = [
  {
    id: "ring-toss",
    name: "Ring Toss",
    category: "Classic",
    icon: Target,
    description: "Classic ring throwing game with exciting prizes",
    fullDescription: "Test your aim and precision in this timeless carnival favorite! Players toss rings at arranged pegs, trying to land them perfectly. Each successful ring scores points towards amazing prizes. Perfect for all ages, Ring Toss combines skill with luck for an unforgettable experience.",
    rules: [
      "Each player gets 5 rings per turn",
      "Stand behind the marked line",
      "Rings must land completely around the peg to count",
      "Different colored pegs have different point values",
      "Gold pegs = 50 points, Silver = 30 points, Bronze = 10 points"
    ],
    ageGroup: "All Ages",
    duration: "2-3 minutes",
    players: "1 player",
    price: "₹30",
    difficulty: "Easy"
  },
  {
    id: "musical-chairs",
    name: "Musical Chairs",
    category: "Group",
    icon: Music,
    description: "Fast-paced musical elimination game",
    fullDescription: "The ultimate party game that gets everyone moving! When the music plays, participants walk around the chairs. The moment it stops, everyone scrambles for a seat. One chair is removed each round until only one champion remains. Energy, speed, and a bit of strategy make this game a crowd favorite!",
    rules: [
      "Walk around chairs while music plays",
      "Find a seat immediately when music stops",
      "No pushing or physical contact allowed",
      "One chair removed after each round",
      "Last person standing wins"
    ],
    ageGroup: "5-60 years",
    duration: "10-15 minutes",
    players: "8-15 players",
    price: "₹25",
    difficulty: "Easy"
  },
  {
    id: "sack-race",
    name: "Sack Race",
    category: "Active",
    icon: Footprints,
    description: "Hop your way to victory in burlap sacks",
    fullDescription: "Get ready to hop, bounce, and race your way to the finish line! Participants step into large burlap sacks and race against each other in this hilarious and energetic competition. Balance, coordination, and speed determine the winner. Expect lots of laughs and tumbles!",
    rules: [
      "Both feet must stay inside the sack",
      "Hold the sack at waist level",
      "No stepping out of the sack during the race",
      "First to cross the finish line wins",
      "Falls are okay - get up and keep going!"
    ],
    ageGroup: "6-50 years",
    duration: "3-5 minutes",
    players: "4-8 racers",
    price: "₹20",
    difficulty: "Medium"
  },
  {
    id: "treasure-hunt",
    name: "Treasure Hunt",
    category: "Adventure",
    icon: Puzzle,
    description: "Solve clues and find hidden treasures",
    fullDescription: "Embark on an exciting adventure through the venue! Follow cryptic clues, solve puzzles, and decode messages to find hidden treasures. Each clue leads to the next location, building suspense until the final treasure is discovered. Perfect for those who love mystery and exploration!",
    rules: [
      "Teams of 2-4 members allowed",
      "Follow clues in sequence",
      "No using phones for puzzle solutions",
      "Stay within designated areas",
      "First team to find the treasure wins"
    ],
    ageGroup: "8-60 years",
    duration: "20-30 minutes",
    players: "2-4 per team",
    price: "₹50",
    difficulty: "Hard"
  },
  {
    id: "ludo-giant",
    name: "Giant Ludo",
    category: "Board",
    icon: Dices,
    description: "Life-sized Ludo board experience",
    fullDescription: "Experience the beloved board game like never before on a massive life-sized board! Players become their own game pieces, moving across the giant board based on dice rolls. Strategy, luck, and lots of fun combine in this supersized version of the classic family favorite.",
    rules: [
      "Roll the giant dice to move",
      "Need exact number to enter home",
      "Safe zones protect from captures",
      "Capture opponents by landing on their space",
      "First to get all pieces home wins"
    ],
    ageGroup: "6-70 years",
    duration: "15-25 minutes",
    players: "2-4 players",
    price: "₹35",
    difficulty: "Easy"
  },
  {
    id: "balloon-darts",
    name: "Balloon Darts",
    category: "Classic",
    icon: Target,
    description: "Pop balloons with precision darts",
    fullDescription: "Take aim and let your darts fly! A colorful wall of balloons awaits your precision throws. Pop as many as you can to earn points and prizes. Different colored balloons contain different surprises - some have bonus points, others have instant prizes!",
    rules: [
      "3 darts per turn",
      "Stand behind the throwing line",
      "Balloons must pop to count",
      "Gold balloons = jackpot prizes",
      "No running throws allowed"
    ],
    ageGroup: "8+ years",
    duration: "2-3 minutes",
    players: "1 player",
    price: "₹40",
    difficulty: "Medium"
  },
  {
    id: "tug-of-war",
    name: "Tug of War",
    category: "Team",
    icon: Swords,
    description: "Ultimate team strength challenge",
    fullDescription: "The classic test of team strength and coordination! Two teams grip opposite ends of a thick rope and pull with all their might. Victory goes to the team that pulls the opposing team past the center marker. Teamwork, strategy, and raw power determine the champions!",
    rules: [
      "Teams of 6-8 members",
      "Grip rope with both hands",
      "No wrapping rope around body",
      "Pull when whistle blows",
      "Best of 3 rounds wins"
    ],
    ageGroup: "10-50 years",
    duration: "5-10 minutes",
    players: "6-8 per team",
    price: "₹15 per person",
    difficulty: "Medium"
  },
  {
    id: "reaction-game",
    name: "Reaction Challenge",
    category: "Skill",
    icon: Zap,
    description: "Test your lightning-fast reflexes",
    fullDescription: "How fast are your reflexes? Find out in this electronic challenge! Press the correct buttons as they light up in increasingly faster sequences. Beat the clock and climb the leaderboard. Only those with the quickest reactions will claim victory!",
    rules: [
      "Hit buttons as they light up",
      "Speed increases each level",
      "Three misses and you're out",
      "Highest score wins",
      "No blocking opponent's buttons"
    ],
    ageGroup: "7-60 years",
    duration: "3-5 minutes",
    players: "1-2 players",
    price: "₹30",
    difficulty: "Medium"
  },
  {
    id: "obstacle-course",
    name: "Obstacle Course",
    category: "Active",
    icon: Shield,
    description: "Navigate through exciting challenges",
    fullDescription: "Race through an action-packed obstacle course designed to test your agility, strength, and determination! Crawl under nets, jump over hurdles, climb walls, and balance on beams. Complete the course in the fastest time to top the leaderboard and win amazing prizes!",
    rules: [
      "Complete obstacles in order",
      "No skipping any obstacle",
      "Timer starts at the whistle",
      "Falling means restart that obstacle",
      "Fastest time wins"
    ],
    ageGroup: "8-45 years",
    duration: "5-8 minutes",
    players: "1 player at a time",
    price: "₹45",
    difficulty: "Hard"
  },
  {
    id: "memory-match",
    name: "Memory Match",
    category: "Skill",
    icon: Puzzle,
    description: "Test your memory with card matching",
    fullDescription: "Challenge your brain with this exciting memory game! Flip cards to reveal pictures and find matching pairs. Remember the locations and make the matches in the fewest moves possible. Sharpen your mind while having fun!",
    rules: [
      "Flip two cards per turn",
      "Matching pairs stay face up",
      "Non-matches flip back down",
      "Find all pairs to win",
      "Fewest moves = higher score"
    ],
    ageGroup: "5-70 years",
    duration: "5-10 minutes",
    players: "1-2 players",
    price: "₹25",
    difficulty: "Easy"
  },
  {
    id: "bean-bag-toss",
    name: "Bean Bag Toss",
    category: "Classic",
    icon: Target,
    description: "Aim for the holes and score big",
    fullDescription: "Also known as Cornhole, this classic game challenges your throwing accuracy! Toss bean bags at an angled board with different-sized holes. Each hole has different point values - the smaller the hole, the bigger the reward. Perfect for friendly competition!",
    rules: [
      "4 bean bags per player",
      "Stand behind the throwing line",
      "Bags through holes score points",
      "Bags on board score 1 point",
      "Highest total score wins"
    ],
    ageGroup: "All Ages",
    duration: "5-7 minutes",
    players: "2-4 players",
    price: "₹25",
    difficulty: "Easy"
  },
  {
    id: "dance-off",
    name: "Dance Off",
    category: "Group",
    icon: Music,
    description: "Show your best dance moves",
    fullDescription: "Get ready to groove! Step onto the dance floor and show off your best moves. Follow the rhythm, improvise, and let your personality shine. Judges will score based on creativity, energy, and crowd engagement. The dancer who brings the most energy wins!",
    rules: [
      "Dance when music plays",
      "Freeze when music stops",
      "No inappropriate moves",
      "Audience engagement encouraged",
      "Judges' decision is final"
    ],
    ageGroup: "5-60 years",
    duration: "3-5 minutes per round",
    players: "2-6 contestants",
    price: "₹20",
    difficulty: "Easy"
  },
  {
    id: "archery-zone",
    name: "Archery Zone",
    category: "Skill",
    icon: Target,
    description: "Hit the bullseye like a pro",
    fullDescription: "Channel your inner archer in this exciting target challenge! Using safe foam-tipped arrows and professional bows, aim for the bullseye on our colorful targets. Score points based on accuracy. Training provided for beginners!",
    rules: [
      "5 arrows per turn",
      "Stand at marked distance",
      "Wait for range clear signal",
      "Bullseye = 100 points",
      "Safety equipment must be worn"
    ],
    ageGroup: "10+ years",
    duration: "5-7 minutes",
    players: "1 player",
    price: "₹50",
    difficulty: "Medium"
  }
];

export const categories = ["All", "Classic", "Group", "Active", "Adventure", "Board", "Team", "Skill"];
