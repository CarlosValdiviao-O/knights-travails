# knights-travails
Update: I just realized that we're not supposed to build a binary tree but a SIMILAR data structure and in that matter, both of my firts solutions are not binary trees, they are just trees, so even though they work they are wrong.

The third and real solution creates a Map with all possible moves a knight can do, so only 64 nodes linked to each other, and then searches for the shortest path using a BFS algorithm.

The first solution is not ideal, but the instructions were to build a tree and THEN search for the shortest path, so that's what it does, but there are way too many paths to compute so it freezes, that's why i added a limit of ten levels in depth.

The second one on the other hand looks for the shortest path while building the tree so it has better performance, but still bad I suppose since this wasn't the instructed approach.