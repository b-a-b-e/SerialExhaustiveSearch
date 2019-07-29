# Serial Exhaustive Search
Implementation of SES experiment (Sternberg 1966 "High-speed scanning in human memory" _Science_, experiment 1)

Experiment structure
---
- instructions
- practice trial x 5 
- main trial x 30

Trial structure
---
- presentation of sequence stimuli (display each digit for 1.2s)
- presentation of test digit (either present or absent) (after 3.45s delay)
- record response

Response keys
---
keys 'f' and 'j' are mapped randomly onto responses 'present' and 'absent' in the beginning of each experiment 


Data recorded
---
stimulus sequence

probe digit

probe position

response (*wasPresent*, *wasAbsent*)

response time (ms)

Not implemented from original
---
- feedback after each response
- recall task after
