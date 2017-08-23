-module (marsrover).
-export ([rove/2]).
-define(COMPASS, #{
    {'N',00} => {0,1},
    {'E',09} => {1,0},
    {'S',18} => {0,-1},
    {'W',27} => {-1,0}
}).

execute(Cmd,{X,Y,Deg},{Dx,Dy}) ->
  case Cmd of
    'L' -> 
      {X,Y,Deg-9};
    'R' -> 
      {X,Y,Deg+9};
    'M' -> 
      {X+Dx,Y+Dy,Deg};
    _ -> 
      {X,Y,Deg}
  end.
  
rove(Vec={X,Y,D},Cmd) ->
  Keys = maps:keys(?COMPASS),
  case lists:keyfind(D, 1, Keys) of
    CKey = {_, Deg} ->
      {Dx,Dy} = maps:get(CKey, ?COMPASS),
      {NewX,NewY,NewDeg} = execute(Cmd, {X,Y,Deg}, {Dx,Dy}),
      {NewD,_} = lists:keyfind(NewDeg rem 36, 2, Keys),
      {NewX,NewY,NewD};
      
    false ->
      Vec
  end.

%1> P1 = marsrover:rove({3,3,'E'}, 'M').
%2> P2 = marsrover:rove(P1, 'R').
%3> P3 = marsrover:rove(P2, 'M').
%4> marsrover:rove(P3, 'L').
% {4,2,'E'}