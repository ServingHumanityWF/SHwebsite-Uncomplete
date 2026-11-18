/* =========================================================
   ZAKAT CALCULATOR SETTINGS  -  Serving Humanity Welfare Foundation
   ---------------------------------------------------------
   This is the ONLY file you need to edit to keep the Zakat calculator
   up to date. Every page (index, About, Contact) reads these values.

   WHAT TO UPDATE
     - goldPerGram / silverPerGram : today's price of 1 GRAM of pure (24K / 999)
       gold and silver in PKR.
         price per tola  ÷ 11.664  = price per gram
         price per 10 g  ÷ 10      = price per gram
     - updated : the date of those prices, written as YYYY-MM-DD.

   The Nisab (the minimum wealth on which Zakat is due) is worked out by the
   calculator from these prices:
         silver Nisab = 612.36 g  x  silverPerGram
         gold   Nisab =  87.48 g  x  goldPerGram

   If this file is older than maxAgeDays, the calculator tells visitors to
   check today's rate before paying, so a forgotten update is not silent.

   CURRENT VALUES (checked on 14 Nov 2026)
     Rates of the All Pakistan Sarafa Gems & Jewellers Association, as
     published by Daily Pakistan on 14 Nov 2026:
       24K gold  : Rs 410,936 per tola  (Rs 352,311 per 10 gram)
       silver    : Rs   5,343 per tola
     Prices move fast (gold has fallen by more than Rs 10,000 per tola in a
     single day this month), so update this file regularly.
========================================================= */

window.ZAKAT_CONFIG = {
  updated: "2026-11-18",

  goldPerGram: 35060, // PKR per gram of 24K gold  (408936 / 11.664)
  silverPerGram: 454.3, // PKR per gram of silver  (5,228 / 11.664)

  // "silver" (recommended for cash and mixed wealth, and the common choice in
  // Pakistan) or "gold" (only if all your wealth is gold)
  nisabBasis: "silver",

  silverNisabGrams: 612.36, // 52.5 tola
  goldNisabGrams: 87.48, // 7.5 tola
  tolaGrams: 11.664,
  rate: 0.025, // 2.5%

  maxAgeDays: 45,
};
