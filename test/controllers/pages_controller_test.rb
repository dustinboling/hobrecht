require 'test_helper'

class PagesControllerTest < ActionController::TestCase
  test "should get bio" do
    get :bio
    assert_response :success
  end

  test "should get contact" do
    get :contact
    assert_response :success
  end

end
