### /.CLOUD66/SHARED_SPREE.SH ###

mkdir -p $STACK_BASE/shared/spree
chown nginx:app_writers $STACK_BASE/shared/spree
rm -rf $STACK_PATH/public/spree
ln -nsf $STACK_BASE/shared/spree $STACK_PATH/public/spree