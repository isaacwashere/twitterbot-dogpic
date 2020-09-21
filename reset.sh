# Check to see if a file exists, if it does then remove it, else continue on
removeFile() {
  file="$1"
  if [ -f "$file" ]
  then 
    echo "$file found and being removed..."
    sleep 2
    rm -i "$file"
  else 
    echo "$file does not currently exist; continuing"
    return 
  fi
}

# Check to see if a dir exists, if it does then remove it, else continue on
removeDir() {
  dir="$1"
  if [ -d "$dir"/ ]
  then
    echo "$dir found and being removed..."
    sleep 2
    rm -rf -i "$dir"
  else
    echo "$dir do(es) not currently exist; continuing..."
    return
  fi
}

# -- - -- - -- - -- - -- - -- - -- - -- - -- - -- - -- - -- - -- - -- -
# Actual script
# -- - -- - -- - -- - -- - -- - -- - -- - -- - -- - -- - -- - -- - -- -

removeDir node_modules

sleep 2

removeFile yarn.lock

sleep 2 

removeDir dist

echo "******* REMOVALS COMPLETE *******"

yarn install 

sleep 2 

yarn build

echo "******* INSTALLATIONS COMPLETE *******"
