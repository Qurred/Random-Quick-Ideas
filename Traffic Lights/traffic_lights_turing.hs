import System.Environment
import Control.Monad

data State = Green | Red | Yellow | RedYellow | Halt deriving (Read, Show, Eq, Enum)
data Direction = L | S | R deriving (Read, Show, Eq, Enum)
data TuringMachineState = TuringMachineState State [Char] Int Direction deriving (Show)
 
changeState::State -> Char ->State
changeState Green 'X'= Yellow
changeState Yellow 'X'= Red
changeState Red 'X'= RedYellow
changeState RedYellow 'Y'= Green
changeState _ _= Halt

charByState::State->Char
charByState Green = 'X'
charByState Yellow = 'Y'
charByState Red = 'X'
charByState RedYellow = 'X'
charByState _ = 'X'


getDirection::State->Direction
getDirection Green = R
getDirection Yellow = R
getDirection Red = L
getDirection RedYellow = L
getDirection _ = S

moveIndex::Direction->Int
moveIndex R = 1
moveIndex L = -1
moveIndex S = 0

replaceNthValue::Int->Char->[Char]->[Char]
replaceNthValue n nv (x:xs)
 | n == 0 = nv:xs
 | otherwise = x:replaceNthValue (n-1) nv xs 

run::TuringMachineState->TuringMachineState
run (TuringMachineState s t cI d) = do
 if s == Halt
 then (TuringMachineState Halt t cI d)
 else do
  let tape = replaceNthValue cI (charByState s) t
  let state = changeState s (t!!cI)
  let currDir = getDirection state
  let currentIndex = cI + moveIndex d
  (TuringMachineState state tape currentIndex currDir)

isHalt::TuringMachineState->Bool
isHalt (TuringMachineState s _ _ _) = s == Halt

main = do
 args <- getArgs
 let currState = read $ (head args)::State
 let tape =  [ x!!0 | x <- (tail args)]
 let currentIndex = 0
 let currDir = R
 let state = (TuringMachineState currState tape currentIndex currDir)
 print (TuringMachineState currState tape currentIndex currDir)
 whileLoop (TuringMachineState currState tape currentIndex currDir)
 
whileLoop::TuringMachineState->IO (TuringMachineState)
whileLoop (TuringMachineState s t cI d) = do
 print (TuringMachineState s t cI d)
 if(isHalt (TuringMachineState s t cI d))
 then return (TuringMachineState s t cI d)
 else whileLoop $ run $ (TuringMachineState s t cI d)
 
 
 
 
 
 
 
 
 