# SerialExhaustiveSearch
Implementation of SES experiment (Sterberg 1966, experiment 1)

Experiment structure
---
- instructions
- practice trial x 24
- main trial x 144

Trial structure
---
- presentation of sequence stimuli (display each digit for 1.2s)
- presentaiton of test digit (either present or absent) (after 2s delay)
- record response

Response
---
'd' = probe digit in sequence

'k' = probe digit not in sequence

Data recorded
---
stimulus sequence

probe digit

trial type (*present* or *absent*)

response (*wasPresent*, *wasAbsent*)

response time (ms)



Not implemented
---
- feedback after each response
- recall task after