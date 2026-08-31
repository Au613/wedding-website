export type Bracha = {
  id: number;
  title: string;
  transliteration: string;
  hebrew: string;
  theme: string;
  explanation: string;
  /**
   * Hebrew is stored here for rabbinic/couple review.
   * Treat as a draft until confirmed.
   */
  needsReview: true;
};

export const sevenBrachot: Bracha[] = [
  {
    id: 1,
    title: "Borei Pri HaGafen",
    transliteration: "Baruch atah Adonai, Eloheinu melech haolam, borei pri hagafen.",
    hebrew: "בָּרוּךְ אַתָּה יְיָ אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, בּוֹרֵא פְּרִי הַגָּפֶן",
    theme: "The fruit of the vine",
    explanation:
      "We begin with wine, the Jewish shorthand for joy. A cup is held, a blessing is said, and the celebration is officially poured.",
    needsReview: true,
  },
  {
    id: 2,
    title: "Shehakol Bara Lichvodo",
    transliteration: "Baruch atah Adonai, Eloheinu melech haolam, shehakol bara lichvodo.",
    hebrew: "בָּרוּךְ אַתָּה יְיָ אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, שֶׁהַכֹּל בָּרָא לִכְבוֹדוֹ",
    theme: "Creation for glory",
    explanation: "Everything — this garden, this gathering, this couple — was created for a glory larger than any one wedding.",
    needsReview: true,
  },
  {
    id: 3,
    title: "Yotzer HaAdam",
    transliteration: "Baruch atah Adonai, Eloheinu melech haolam, yotzer ha'adam.",
    hebrew: "בָּרוּךְ אַתָּה יְיָ אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, יוֹצֵר הָאָדָם",
    theme: "The forming of the human",
    explanation: "A blessing on the sheer fact of being human — capable of love, covenant, and showing up on time in nice shoes.",
    needsReview: true,
  },
  {
    id: 4,
    title: "Asher Yatzar",
    transliteration:
      "Baruch atah Adonai, Eloheinu melech haolam, asher yatzar et ha'adam b'tzalmo...",
    hebrew:
      "בָּרוּךְ אַתָּה יְיָ אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, אֲשֶׁר יָצַר אֶת הָאָדָם בְּצַלְמוֹ, בְּצֶלֶם דְּמוּת תַּבְנִיתוֹ, וְהִתְקִין לוֹ מִמֶּנּוּ בִּנְיַן עֲדֵי עַד. בָּרוּךְ אַתָּה יְיָ, יוֹצֵר הָאָדָם",
    theme: "In the divine image",
    explanation:
      "We are formed in an image that includes partnership — a building that is meant to last.",
    needsReview: true,
  },
  {
    id: 5,
    title: "Sos Tasis",
    transliteration: "Sos tasis v'tagel ha'akarah, b'kibbutz baneha l'tochah b'simcha...",
    hebrew:
      "שׂוֹשׂ תָּשִׂישׂ וְתָגֵל הָעֲקָרָה בְּקִבּוּץ בָּנֶיהָ לְתוֹכָהּ בְּשִׂמְחָה. בָּרוּךְ אַתָּה יְיָ, מְשַׂמֵּחַ צִיּוֹן בְּבָנֶיהָ",
    theme: "Zion rejoices",
    explanation:
      "The joy of a wedding is not only private. It is imagined as the joy of a people coming home.",
    needsReview: true,
  },
  {
    id: 6,
    title: "Sameach Tesamach",
    transliteration: "Sameach tesamach re'im ha'ahuvim, k'samechacha yetzircha b'gan eden mikedem...",
    hebrew:
      "שַׂמַּח תְּשַׂמַּח רֵעִים הָאֲהוּבִים כְּשַׂמֵּחֲךָ יְצִירְךָ בְּגַן עֵדֶן מִקֶּדֶם. בָּרוּךְ אַתָּה יְיָ, מְשַׂמֵּחַ חָתָן וְכַלָּה",
    theme: "Joy of beloved companions",
    explanation:
      "May these two be as glad as the first companions in a garden — which is a high bar, and also the point.",
    needsReview: true,
  },
  {
    id: 7,
    title: "Asher Bara",
    transliteration:
      "Baruch atah Adonai, Eloheinu melech haolam, asher bara sason v'simcha, chatan v'kallah...",
    hebrew:
      "בָּרוּךְ אַתָּה יְיָ אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, אֲשֶׁר בָּרָא שָׂשׂוֹן וְשִׂמְחָה חָתָן וְכַלָּה גִּילָה רִנָּה דִּיצָה וְחֶדְוָה אַהֲבָה וְאַחֲוָה וְשָׁלוֹם וְרֵעוּת. בָּרוּךְ אַתָּה יְיָ, מְשַׂמֵּחַ הַחָתָן עִם הַכַּלָּה",
    theme: "Joy, gladness, bride and groom",
    explanation:
      "A cascade of joy-words. This is the blessing that sounds like a wedding, because it is one.",
    needsReview: true,
  },
];
