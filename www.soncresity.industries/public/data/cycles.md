# SI Cycles Conversion

SI Cycles are a standardized time measurement system used within Soncresity Industries projects. Each **Cycle** represents a fixed length of time in seconds (configurable, e.g., 60 seconds per cycle), and sub- or super-units scale using standard SI prefixes (Nonocycle, Microcycle, Milicycle, Kilocycle, Megacycle, etc.).  

To calculate cycles from an Earth date:

1. Convert the ISO 8601 datetime (UTC) into seconds since the Big Bang reference (a fixed origin point, currently set as ~13.8 billion years ago).  
2. Divide the total seconds by the length of one Cycle (`C_len`) to get the total number of Cycles.  
3. For sub- or super-cycles, multiply or divide by powers of 1,000 according to the prefix.  

To convert back, multiply cycles by the cycle length and add the Big Bang offset to obtain the original Earth datetime.
