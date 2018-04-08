import numpy as np

sequences = []
for i1 in range(0, 10):
    sequences.append([i1])
    for i2 in range(0, 10):
        sequences.append(list(set([i1, i2])))
        for i3 in range(0, 10):
            sequences.append(list(set([i1, i2, i3])))
            for i4 in range(0, 10):
                sequences.append(list(set([i1, i2, i3, i4])))
                for i5 in range(0, 10):
                    sequences.append(list(set([i1, i2, i3, i4, i5])))
                    for i6 in range(0, 10):
                        sequences.append(list(set([i1, i2, i3, i4, i5, i6])))

def set_probe(trial):
    present = np.random.choice([True, False])
    if present:
        probe = np.random.choice(trial)
        trial_type = 'present'
    else:
        probe = np.random.choice(list(set([0,1,2,3,4,5,6,7,8,9]) - set(trial)))
        trial_type = 'absent'
    return probe, trial_type

def make_trials(number):
    seq = list(np.random.choice(sequences, number))
    trials = []
    for i in seq:
        probe, trial_type = set_probe(i)
        trials.append({'stimulus': i, 'probe': probe, 'trial_type': trial_type})
    return trials
