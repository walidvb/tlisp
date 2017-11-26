# Support for multiple selects (just call chosen_select as many times as required):
module SelectHelper
  def select2(item_text, options)
    page.evaluate_script("$(\"#{options[:from]}\").val('#{item_text}')")
    # option_value = page.evaluate_script("$(\"##{field[:id]} option:contains('#{item_text}')\").val()")
    # page.execute_script("value = ['#{option_value}']\; if ($('##{field[:id]}').val()) {$.merge(value, $('##{field[:id]}').val())}")
    # option_value = page.evaluate_script("value[0]")
    # page.execute_script("$('##{field[:id]}').val(#{option_value})")
    # page.execute_script("$('##{field[:id]}').trigger('chosen:updated')")
  end
end
World(SelectHelper)
